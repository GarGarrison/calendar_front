<template>
    <div class="row">
        <div class="col s12">
            <h2><i class="material-icons medium left">home</i>{{ utils.nameView($root.cu) }}</h2>
        </div>
        <div class="col m12 l4">
            <div class="card">
                <ul class="collection with-header">
                    <li class="collection-header"><h5>Запросы</h5></li>
                    <li v-for="event in events" class="collection-item">
                        <span class="truncate"> Взять часы </span>
                        <div class="pair-badge-container">
                            <span class="badge info inline-badge">{{ utils.dateView(event.dt_start) }}</span>
                            <span class="badge low inline-badge">согласовано</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col m12 l4">
            <div class="card">
                <ul class="collection with-header">
                    <li class="collection-header"><h5>Статистика</h5></li>
                    <li class="collection-item">
                        <span class="truncate">Кол-во дней отпуска</span>
                        <span class="badge info">15/30</span>
                    </li>
                    <li class="collection-item">
                        <span class="truncate">Часов</span>
                        <span class="badge info">30</span>
                    </li>
                    <li class="collection-item">
                        <span class="truncate">Отгулов</span>
                        <span class="badge info">5</span>
                    </li>
                    <li class="collection-item">
                        <span class="truncate">Дежурств</span>
                        <span class="badge info">30</span>
                    </li>
                    <li class="collection-item">
                        <span class="truncate">Конец контракта</span>
                        <span class="badge info">2019-07-01</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col m12 l4">
            <div class="card">
                <ul class="collection with-header">
                    <li class="collection-header"><h5>Учеба</h5></li>
                    <li class="collection-item">
                        <span class="truncate"> док ололололоо   </span>
                        <div class="pair-badge-container">
                            <span class="badge info inline-badge">2018-02-01</span>
                            <span class="badge info inline-badge">2018-01-01</span>
                        </div>
                    </li>
                    <li class="collection-item">
                        <span class="truncate"> док ололололоо   </span>
                        <div class="pair-badge-container">
                            <span class="badge info inline-badge">2018-02-01</span>
                            <span class="badge info inline-badge">2018-01-01</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card">
                <ul class="collection with-header">
                    <li class="collection-header"><h5>Контракты</h5></li>
                    <li class="collection-item">
                        <span class="truncate"> 1 </span>
                        <div class="pair-badge-container">
                            <span class="badge info inline-badge">2018-02-01</span>
                            <span class="badge info inline-badge">2018-01-01</span>
                        </div>
                    </li>
                    <li class="collection-item">
                        <span class="truncate"> 2 </span>
                        <div class="pair-badge-container">
                            <span class="badge info inline-badge">2018-02-01</span>
                            <span class="badge info inline-badge">2018-01-01</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'

    import {utils, Consts} from './utils'
    
    export default {
        data: function(){
            return {
                utils: utils,
                Consts: Consts,
                events: []
            }
        },
        methods: {

        },
        created: function(){
            var vm = this;
            axios.get("/get_user_events")
                    .then(function(response){
                        vm.events = response.data.events;

                    })
                    .catch(utils.catchProcess)
        },
        components: {
            // Datepicker
        }

}
</script>
<style scoped>
    .whitespace {
        white-space: nowrap;
    }
    .pair-badge-container {
        width: calc(100% - 45px);
        top: .75rem;
        position: absolute;
    }
    .inline-badge {
        position: initial;
        float: right;
    }
</style>