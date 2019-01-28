<template>
    <div>
        <vue-context ref="context_menu">
            <div slot-scope="child">
                <div v-if="child.data">
                    <div class="v-context-header">{{ utils.nameView($root.userById[child.data.user]) }} | {{ utils.dateView(child.data.date) }}</div>
                </div>
                <ul>
                    <li @click="menu(child.data, consts.EventType.PLANNED_VACATION)">Планируемый отпуск</li>
                    <li @click="menu(child.data, consts.EventType.VACATION)">Отпуск</li>
                    <li @click="menu(child.data, consts.EventType.HOLIDAY)">Отгул</li>
                    <li @click="menu(child.data, consts.EventType.ILL)">Болезнь</li>
                    <li @click="menu(child.data, consts.EventType.BUSINESS)">Командировка</li>
                </ul>
            </div>
        </vue-context>
        <!-- <modal>
            
        </modal>-->
        <div class="row">
            <div class="col s12">
                <h2>Calendar
                    <i class="material-icons range_navigation" @click="newRange('right')">keyboard_arrow_right</i>
                    <i class="material-icons range_navigation" @click="newRange('left')">keyboard_arrow_left</i>
                </h2>
            </div>
        </div>
        <div class="row">
            <table class="calendar">
                <tr class="calndar-months">
                    <td v-if="topMonthTr.prev" :colspan="topMonthTr.prev.index">{{ topMonthTr.prev.month }}</td>
                    <td v-if="topMonthTr.current" :colspan="topMonthTr.current.index">{{ topMonthTr.current.month }}</td>
                    <td v-if="topMonthTr.next" :colspan="topMonthTr.next.index">{{ topMonthTr.next.month }}</td>
                </tr>
                <tr>
                    <td class="range_header"></td>
                    <td class="range_header stat_header hide-on-med-and-down">Часы</td>
                    <td class="range_header stat_header hide-on-med-and-down">Отгл.</td>
                    <td class="range_header stat_header hide-on-med-and-down">Отпк.</td>
                    <td class="range_header stat_header hide-on-med-and-down">Деж.</td>
                    <td class="range_header" v-for="day in days" :class="{weekend: day.weekend, today: day.date == today}">{{ utils.shortestDateView(day.date) }}</td>
                </tr>
                <tr v-for="user, index in users" :class="{cal_tr_hover: user_td_hover == user.uid}">
                    <td @mouseover="user_td_hover=user.uid"
                        @mouseleave="user_td_hover=0">
                        {{ utils.nameView(user) }}
                    </td>
                    <td class="hide-on-med-and-down">
                        {{ user.hours }}
                    </td>
                    <td class="hide-on-med-and-down">
                        {{  user.uid in user_stat ? (user_stat[user.uid][consts.EventType.HOLIDAY] || 0 ) : 0 }}
                    </td>
                    <td class="hide-on-med-and-down">
                        {{  user.uid in user_stat ? (user_stat[user.uid][consts.EventType.VACATION] || 0 ) : 0 }}
                    </td>
                    <td class="hide-on-med-and-down">
                        {{  user.uid in user_stat ? (user_stat[user.uid][consts.EventType.DUTY] || 0 ) : 0 }}
                    </td>
                    <td class="cell" v-for="day in days"
                        @contextmenu.prevent="context($event, user, day)"
                        @click="cellClick(user, day)"
                        :class="cellClassObject(user, day)">
                    </td>
                </tr>
            </table>
        </div>
        <div class="row">
            <div class="color_legend planned_vacation">Пл. отпуск</div>
            <div class="color_legend vacation">Отпуск/Отгул</div>
            <div class="color_legend hours">Часы</div>
            <div class="color_legend ill">Болен</div>
            <div class="color_legend business">Командировка</div>
            <div class="color_legend duty">Дежурит</div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'
    import {utils, Consts} from './utils'
    import { VueContext } from 'vue-context'
    import DatePicker from 'vue2-datepicker'
    import Modal from './components/Modal'

    moment.locale('ru');
    export default {
        data: function(){
            return {
                start_of_range: null,
                start_of_month: null,
                days_count: null,
                today: moment().format(Consts.date_format),
                utils: utils,
                consts: Consts,
                events: [],
                weekends: [],
                user_stat: {},
                user_td_hover: 0,
                show: false,
            }
        },
        methods: {
            context: function(event, user, day) {
                console.log(day);
                this.$refs.context_menu.open(event, {user:user.uid, date:day.date})
            },
            calcDaysData: function(start) {
                if ( ! start._isAMomentObject) start = moment(start);
                var vm = this;
                this.start_of_month = start.startOf("month").format(Consts.date_format);
                var start_dow = start.startOf("month").weekday();
                this.start_of_range = start.clone().subtract(start_dow, 'days').format(Consts.date_format);
                var end_dow = start.endOf("month").weekday();
                this.days_count = start_dow + start.daysInMonth() + (7-end_dow-1);

                axios.get(`/get_range/${this.start_of_range}/${this.days_count}`)
                    .then(function(response){
                        vm.weekends = response.data.weekends;
                        vm.events = response.data.events;
                    })
                    .catch(utils.catchProcess)
            },
            newRange: function(direct){
                var vm = this;
                var start = null;
                if (direct == "left") start = moment(this.start_of_month).subtract(1, 'months');
                else if (direct == "right") start = moment(this.start_of_month).add(1, 'months');
                else return false;
                this.calcDaysData(start);
            },
            arrowPress: function(event){
                var key = event.keyCode;
                if (key != 37 && key != 39) return false;
                var direct = key == 37 ? "left": "right";
                this.newRange(direct);
            },
            cellClick: function(user, day) {
                var uid = user.uid;
                // Найти в событиях событие с датой, по которой кликнули, и взять только относящиеся к дежурству
                var duty_of_current_day = this.events.filter(function(x){if (x.etype == Consts.EventType.DUTY && x.dt_start == day.date) return x});
                // Сделать значения словаря плоским массивом [[1,2],[3,4],[5,6]] => [1,2,3,4,5,6]
                // и запретить кликать на то что уже занято (человек в этот день отмечень больным или в отпуске)
                var busy_uids = Object.values(day.day_events).flat()
                if (busy_uids.includes(uid)) return false;
                // Если duty_of_current_day пустой, значит надо создать новое событие с дежурством. Если не пусто, значит надо обновить уже существующее
                if (duty_of_current_day.length == 0){
                    var data = {"dt_start": day.date, "dt_end": day.date, "user": uid, "etype": Consts.EventType.DUTY}
                    axios.post('/create_event', data)
                        .then(utils.responseProcess)
                        .catch(utils.catchProcess)
                    this.events.push(data);
                }
                else {
                    var data = {"user": uid}
                    axios.post('/edit_event/' + duty_of_current_day[0].id, data)
                        .then(utils.responseProcess)
                        .catch(utils.catchProcess)
                    this.$set(duty_of_current_day[0], "user", uid);
                }
            },
            cellClassObject: function(user, day){
                var rez = { 
                    weekend: day.weekend,
                    duty: day.duty == user.uid
                }

                for (var k in Consts.EventClasses) if (day.day_events[k] && day.day_events[k].includes(user.uid)) rez[Consts.EventClasses[k]] = true;
                // если вдруг дежурство совпало с отпуском, болезнью  и тд - аларм
                if ( rez.duty && (rez.holiday || rez.vacation || rez.planned_holiday || rez.ill || rez.business) ) rez.alarm = true;
                return rez;
            },
            reloadStat: function(){
                var vm = this;
                axios.get("/get_users_event_stat")
                    .then(function(response){
                        vm.user_stat = response.data.stat;
                    })
                    .catch(utils.catchProcess)
            },
            menu: function(data, etype) {
                var vm = this;
                var new_data = {"user": data.user, "etype": etype, "dt_start": data.date, "dt_end": data.date};
                axios.post("/create_event", new_data)
                    .then(function(){
                        //for(var k in vm.task) vm.task[k] = "";
                        // utils.goBack(vm);
                        vm.events.push(new_data);
                        vm.$root.new_events_counter += 1;
                    })
                    .catch(utils.catchProcess)
            }

        },
        computed: {
            days: function(){
                var days = [];
                // перебрать все даты с start_of_range по start_of_range + days_count (т.е. заполнить текущий range)
                for (var i=0; i < this.days_count; i++){
                    var cur_date = moment(this.start_of_range).add(i, "days").format(Consts.date_format);
                    var weekend = moment(cur_date).weekday() > 4 ? true : false; // выходной по-умолчанию сб и вс
                    weekend = this.weekends.hasOwnProperty(cur_date) ? this.weekends[cur_date] : weekend; // если есть значение в weekends то значение нужно обновить, если нет то оставить старое
                    var day = {
                        date: cur_date,
                        day_events: {},
                        weekend: weekend};
                    for (var e of this.events) {
                        var start = moment(e.dt_start).format(Consts.date_format);
                        // var end = e.dt_end || !e.dt_end ? null : moment(e.dt_end).format(Consts.date_format);
                        var end = e.dt_end ? moment(e.dt_end).format(Consts.date_format) : null;
                        if ( (cur_date >= start && cur_date <= end && end) || ( cur_date == start && !end) ) {
                            if (e.etype == Consts.EventType.DUTY) day.duty = e.user;
                            else {
                                if (e.etype in day.day_events) day.day_events[e.etype].push(e.user);
                                else day.day_events[e.etype] = [e.user];
                            }
                        }
                    }
                    days.push(day);
                }
                return days
            },
            responseCoeff: function(){
                // при свернутом окне 5 первых столбцов пропадают, так что прибавлять их уже не нужно (если меньше 1200px то 1 - столбец с пользователями)
                return window.innerWidth <= 1200 ? 1: 5;
            },
            topMonthTr: function(){
                var vm = this;
                var current_days_count = moment(this.start_of_month).daysInMonth();
                var first_day = vm.days.filter(x=>x.date == vm.start_of_month);
                var first_index = vm.days.indexOf(first_day[0]);

                var rez = {
                    "prev": false,
                    "current": {"index": current_days_count, "month": Consts.months[moment(vm.start_of_month).month()]},
                    "next": false
                }
                // +responseCoeff из-за первых 5 колонок статистики и списка юзеров
                if (first_index > 0) rez["prev"] = {"index": first_index + vm.responseCoeff, "month": Consts.months[moment(vm.days[0].date).month()]}
                // если индес 0 то значит предыдущего месяца нет и +responseCoeff надо добавить к current
                if (first_index == 0)rez.current.index = current_days_count + vm.responseCoeff;
                if (first_index + current_days_count < vm.days_count) rez["next"] = {"index": (vm.days_count - first_index - current_days_count), "month": Consts.months[moment(vm.days[vm.days_count-1].date).month()]}
                return rez;
            },
            users: function() {
                return this.$root.users;
            }
        },
        created: function(){
            window.addEventListener('keyup', this.arrowPress);
            this.calcDaysData( moment().startOf("month") );
            this.reloadStat();
            this.$root.reloadInitData();
        },
        components: {
            VueContext
        }
    }
</script>
<style scoped>
    .cal_tr_hover {
        background: #e5e5e5;
        opacity: 0.7;
    }
    .v-context {
        background: #e5e5e5 !important;
        color: #333 !important;
        outline: none;
    }
    .v-context ul li:hover {
        background: #333 !important;
        color: #e5e5e5 !important;
    }
    .v-context-header {
        padding: 10px 35px;
        font-size: 12px;
        font-weight: 600;
    }
</style>