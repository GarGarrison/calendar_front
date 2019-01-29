<template>
    <div class="row">
        <div class="col s12 l6">
            <h2 slot="header">
                <a @click="$router.go(-1)" class="back-link" title="Назад"><i class="material-icons">keyboard_return</i></a>
                {{ taskHeader }}
            </h2>
            <form @submit.prevent="submitFunc">
                <div class="row view-row">
                    <div class="row">
                        <div class="col s12 validate">
                            <input id="title" type="text" name="title" v-model="task.title">
                            <label for="title">Заголовок</label>
                            <span class="error" v-if="validate_errors.title">{{ validate_errors.title }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 validate">
                            <textarea id="description" name="description" v-model="task.description"></textarea>
                            <label for="description">Описание</label>
                            <span class="error" v-if="validate_errors.description">{{ validate_errors.description }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6 validate">
                            <date-picker v-model="task.deadline" :not-before="utils.today()" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="deadline">Сделать до</label>
                            <span class="error" v-if="validate_errors.deadline">{{ validate_errors.deadline }}</span>
                        </div>
                    </div>
                    <div class="row" v-if="task.ttype == 1">
                        <div class="col s6 validate">
                            <select id="priority" class="browser-default" name="priority" v-model="task.priority">
                                <option :value="consts.Priority.HIGH">Высокий</option>
                                <option :value="consts.Priority.MID">Средний</option>
                                <option :value="consts.Priority.LOW">Низкий</option>
                            </select>
                            <label for="priority">Приоритет</label>
                            <span class="error" v-if="validate_errors.priority">{{ validate_errors.priority }}</span>
                        </div>
                        <div class="col s6 validate">
                            <select id="owner" class="browser-default" name="owner" v-model="task.owner">
                                <option v-for="user in users" :value="user.uid">{{ utils.nameView(user) }}</option>
                            </select>
                            <label for="owner">Ответственный</label>
                            <span class="error" v-if="validate_errors.owner">{{ validate_errors.owner }}</span>
                        </div>
                    </div>
                </div>
                <div class="row view-row">
                    <div class="col s6">
                        <button type="submit" class="btn red">Сохранить</button>
                    </div>
                    <div class="col s6 right-align" v-if="submit == 'edit'">
                        <button @click.prevent="markDone" class="btn low">Сделано</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import {utils, Consts} from './utils'
    import axios from 'axios'
    import moment from 'moment'
    import {Validator} from './validator'
    import ValidationRules from './validation_rules'
    import DatePicker from 'vue2-datepicker'
    export default {
        props: ["submit", "header", "ttype"],
        data: function(){
            return {
                utils: utils,
                consts: Consts,
                task: {
                    priority: Consts.Priority.MID
                },
                validate_errors: {}
            }
        },
        methods: {
            create: function(){
                var vm = this;
                this.task.dt_created = moment().format(Consts.datetime_format);
                if (this.task.deadline) this.task.deadline = moment(this.task.deadline).format(Consts.datetime_format);

                this.validate_errors = Validator.validate(this.task, ValidationRules.tasks);
                if ( Object.keys(this.validate_errors).length > 0 ) {console.log(this.validate_errors); return false;}

                axios.post("/create_task", this.task)
                    .then(function(){
                        for(var k in vm.task) vm.task[k] = "";
                        utils.goBack(vm);
                    })
                    .catch(utils.catchProcess)
            },
            edit: function(){
                var vm = this;
                var tid = vm.$route.params.tid;
                if (vm.task.deadline) vm.task.deadline = moment(vm.task.deadline).format(Consts.datetime_format);
                axios.post("/edit_task/" + tid, this.task)
                    .then(function(){
                        //for(var k in vm.task) vm.task[k] = "";
                        utils.goBack(vm);
                    })
                    .catch(utils.catchProcess)
            },
            markDone: function(){
                var tid = this.$route.params.tid
                console.log(tid);
            }
        },
        computed: {
            taskHeader: function(){
                if (this.header) return this.header;
                else return this.task.title;
            },
            submitFunc: function() {
                return this[this.submit];
            },
            users: function() {
                return this.$root.users
            }
        },
        created: function(){
            var tid = this.$route.params.tid;
            this.task.ttype = this.ttype;
            if (this.submit == "edit") {
                var vm = this;
                axios.get("/get_task/" + tid)
                        .then(function(response){
                            vm.task = response.data.task;

                        })
                        .catch(utils.catchProcess)
            }
        },
        components: {
            DatePicker
        }

}
</script>