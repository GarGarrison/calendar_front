<template>
    <div>
    <div class="row">
        <div class="col s12">
            <h2>Dashboard</h2>
            <span class="top-span">{{ today }}</span>
        </div>
    </div>

    <div class="row">
        <div class="col s4">
            <div class="col s12">
                <div class="card">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Задачи <i class="material-icons dash_icons">work</i></h5></li>
                        <li v-if="tasks.length == 0" class="collection-item">Нет задач</li>
                        <router-link class="collection-item"
                                v-for="task, index in tasks" 
                                :to="'/task/' + task.id"
                                :key="index">
                                <span class="truncate"> {{ task.title }}</span>
                                <span v-if="task.deadline" class="badge" :class="getClass(task.priority)">{{ utils.timeLeftView(task.deadline) }}</span>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col s4">
            <div class="col s12">
                <div class="card">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Напоминания <i class="material-icons dash_icons">alarm</i></h5></li>
                        <li v-if="reminders.length == 0" class="collection-item">Нет напоминаний</li>
                        <router-link class="collection-item"
                                v-for="task, index in reminders" 
                                :to="'/task/' + task.id"
                                :key="index">
                                <span class="truncate"> {{ task.title }}</span>
                                <span v-if="task.deadline" class="badge info">{{ utils.timeLeftView(task.deadline) }}</span>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col s4">
            <div class="col s12 l6">
                <div class="card">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Дежурный <i class="material-icons dash_icons">account_box</i></h5></li>
                        <li v-if="today_info.today_duty" class="collection-item">{{ utils.nameView( $root.userById[today_info.today_duty.user] ) }}</li>
                        <li v-else class="collection-item">Никого</li>
                    </ul>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>День рождения <i class="material-icons dash_icons">cake</i></h5></li>
                        <li v-for="user in today_info.today_birthday" class="collection-item">{{ utils.nameView(user) }}</li>
                        <li v-if="today_info.today_birthday.length == 0" class="collection-item">Никого</li>
                    </ul>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Отпуск <i class="material-icons dash_icons">local_airport</i></h5></li>
                        <li v-for="event in today_info.today_vacation" class="collection-item">
                            <span class="badge info">до {{ utils.shortDateView(event.dt_end) }}</span>
                            {{ utils.nameView( $root.userById[event.user] ) }}
                        </li>
                        <li v-if="today_info.today_vacation.length == 0" class="collection-item">Никого</li>
                        <!-- <li class="collection-item"><span class="badge info">до 12.09</span>Petrov</li>
                        <li class="collection-item"><span class="badge info">до 10.09</span>Hrenov</li>
                        <li class="collection-item"><span class="badge info">до 14.10</span>Ggurda</li> -->
                    </ul>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Отгул <i class="material-icons dash_icons">weekend</i></h5></li>
                        <li v-for="event in today_info.today_holiday" class="collection-item">{{ utils.nameView( $root.userById[event.user] ) }}</li>
                        <li v-if="today_info.today_holiday.length == 0" class="collection-item">Никого</li>
                        <!-- <li class="collection-item"><span class="badge info">до 12</span>Petrov</li>
                        <li class="collection-item"><span class="badge info">после 15</span>Zigov</li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import axios from 'axios'
    import {utils, Consts} from './utils'
    import MenuButton from './components/MenuButton'
    export default {
        data: function(){
            return {
                utils: utils,
                today_info: {
                    today_holiday: [],
                    today_birthday: [],
                    today_vacation: [],
                    today_duty: null
                },
                all_tasks: []
            }
        },
        methods: {
            getClass: function(priority){
                var cl = "info"
                if (priority == Consts.Priority.HIGH) cl = "high";
                if (priority == Consts.Priority.MID) cl = "mid";
                if (priority == Consts.Priority.LOW) cl = "low";
                return cl;
            },
        },
        computed: {
            today: function() {
                moment.locale('ru');
                return moment().format('dddd DD MMMM YYYY');
            },
            tasks: function(){
                return this.all_tasks.filter(function(x){return x.ttype == 1}).sort(function(a,b){return utils.timeLeft(a.deadline) - utils.timeLeft(b.deadline);})
            },
            reminders: function(){
                return this.all_tasks.filter(function(x){return x.ttype == 2}).sort(function(a,b){return utils.timeLeft(a.deadline) - utils.timeLeft(b.deadline);})
            }
        },
        created: function(){
            var vm = this;
            axios.get("/get_tasks")
                    .then(function(response){
                        vm.all_tasks = response.data.tasks;

                    })
                    .catch(utils.catchProcess)
            axios.get("/get_today_info")
                    .then(function(response){
                        vm.today_info.today_holiday = response.data.today_holiday;
                        vm.today_info.today_birthday = response.data.today_birthday;
                        vm.today_info.today_vacation = response.data.today_vacation;
                        vm.today_info.today_duty =  response.data.today_duty;

                    })
                    .catch(utils.catchProcess)
        },
        components: {
            MenuButton
        }
    }
</script>