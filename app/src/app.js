import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import {utils, Consts} from './utils'
import Home from './Home'
import Dashboard from './Dashboard'
import Calendar from './Calendar'
import Statistic from './Statistic'
import Requests from './Requests'
import EventForm from './EventForm'
// import RequestForm from './RequestForm'
import TaskForm from './TaskForm'

// import MenuWithData from './components/MenuWithData'
import MenuButton from './components/MenuButton'


Vue.use(VueRouter);
// Vue.config.devtools=false;
// locale.use(lang);

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/home', name: 'home', component: Home },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/calendar', name: 'calendar', component: Calendar },
    { path: '/requests', name: 'request', component: Requests },
    { path: '/statistic', name: 'statistic', component: Statistic },
    { path: '/create-event', component: EventForm },
    // { path: '/create-request', component: RequestForm },
    { path: '/create-task', component: TaskForm , props: {header: "Новая задача", submit: "create", ttype: Consts.TaskType.TASK}},
    { path: '/create-reminder', component: TaskForm , props: {header: "Новое напоминание", submit: "create", ttype: Consts.TaskType.REMINDER}},
    { path: '/task/:tid', component: TaskForm, props: {submit: "edit"} }
]

const router = new VueRouter({
    history: true,
    routes
})

// var transport = new Thrift.Transport("http://127.0.0.1:8080");
// var protocol  = new Thrift.Protocol(transport);
// var client    = new CalendarManagerClient(protocol);

// var users = client.get_init_data();
// console.log(users);

var app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        cu: {},
        users: [],
        new_events_counter: null,
        isloading: false
    },
    computed: {
        menu: function(){
            return this.$route.name
        },
        userById: function(){
            return utils.listToDictById(this.users, "uid");
        }
    },
    methods: {
        reloadInitData(){
            var vm = this;
            axios.get("/get_init_data")
                .then(function(response){
                    vm.users = response.data.users;
                    vm.new_events_counter = response.data.new_events_counter
                })
                .catch(utils.catchProcess)

            axios.get("/get_current_user")
                .then(function(response){
                    vm.cu = response.data.user;
                })
                .catch(utils.catchProcess)
        }
    },
    created: function(){
        var vm = this;
        axios.interceptors.request.use((config) => {
            vm.isloading = true;
            return config;
        }, (error) => {
            vm.isloading = false;
            return Promise.reject(error);
        });

        axios.interceptors.response.use((response) => {
            vm.isloading = false;
            return response;
        }, (error) => {
            vm.isloading = false;
            return Promise.reject(error);
        });
        
        this.reloadInitData();
    },
    components: {
        // MenuWithData,
        MenuButton
    },
    router
});