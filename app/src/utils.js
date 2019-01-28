import moment from 'moment'

const Consts = {
    date_format: "YYYY-MM-DD 00:00:00",
    datetime_format: "YYYY-MM-DD HH:mm:00",
    months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    RankType: {
      'NUB' : 1,
      'OBERNUB' : 2,
      'BOSS' : 3,
    },
    TaskType: {
      'TASK' : 1,
      'REMINDER' : 2,
    },
    Status: {
      'NEW' : 1,
      'OPENED' : 2,
      'CLOSED' : 3,
    },
    Priority: {
      'HIGH' : 1,
      'MID' : 2,
      'LOW' : 3,
    },
    EventType: {
        'DUTY': 0,
        'PLANNED_VACATION': 1,
        'VACATION': 2,
        'ADD_HOLIDAY': 3,
        'HOLIDAY': 4,
        'ADD_HOURS': 5,
        'HOURS': 6,
        'ILL': 7,
        'BUSINESS': 8,
        'STUDY': 9,
    },
    EventStatus: {
        'NEW': 1,
        'PLANNED': 2,
        'ACCEPT': 3,
        'CANCEL': 4,
    },
    EventStatusTranslate: {
        1: "Новое",
        2: "Запланировано",
        3: "Согласовано",
        4: "Отклонено",
    },
    EventTranslateByType: {
        0: 'Дежурство',
        1: 'Планируемый отпуск',
        2: 'Отпуск',
        3: 'Добавить отгул',
        4: 'Взять отгул',
        5: 'Добавить часы',
        6: 'Взять часы',
        7: 'Болезнь',
        8: 'Командировка',
        9: 'Учеба',
    },
    EventTranslateKey: {
        'DUTY': 'Дежурство',
        'PLANNED_VACATION': 'Планируемый отпуск',
        'VACATION': 'Отпуск',
        'ADD_HOLIDAY': 'Добавить отгул',
        'HOLIDAY': 'Взять отгул',
        'ADD_HOURS': 'Добавить часы',
        'HOURS': 'Взять часы',
        'ILL': 'Болезнь',
        'BUSINESS': 'Командировка',
        'STUDY': 'Учеба',
    },
    EventTypeFromCode: {
        0: 'DUTY',
        1: 'PLANNED_VACATION',
        2: 'VACATION',
        3: 'ADD_HOLIDAY',
        4: 'HOLIDAY',
        5: 'ADD_HOURS',
        6: 'HOURS',
        7: 'ILL',
        8: 'BUSINESS',
        9: 'STUDY',
    },
    EventClasses: {
        0: "duty", // 'DUTY'
        1: "planned_vacation", // 'PLANNED_VACATION'
        2: "vacation", // 'VACATION'
        4: "holiday", // 'HOLIDAY'
        6: "hours", // 'HOURS'
        7: "ill", // 'ILL'
        8: "business", // 'BUSINESS'
        9: "study", // 'STUDY'
    },
}

let utils = {
    listToDictById: function(arr, id="id"){
        var rez = {}
        for(let l of arr) {
            rez[l[id]]= l;
        }
        return rez;
    },
    goBack: function(vm) {
        vm.$router.go(-1);
    },
    responseProcess: function(response){
        if (response.data.status == "error") {
            alert("Error");
            console.log(response.data.msg);
        }
    },
    catchProcess: function(response) {
        alert("Error");
        console.log(response.data.msg);
    },
    timeLeft: function(t) {
        // сортировка в списке задач по времени. если deadline не указывался, то возвращаем большое значение, чтобы такие задачи упали вниз списка
        if (t == 'None') return 100000;
        var now = moment();
        var time = moment(t);
        return time.diff(now, 'days')
    },
    timeLeftView: function(t) {
        var now = moment();
        var time = moment(t);
        var d = time.diff(now, 'days')
        if (d == 0) return time.diff(now, 'hours') + " ч";
        else return d + " дн";

    },
    today: function(){
        return moment().format(Consts.date_format);
    },
    datepickerFormatter: function(date) {
      return moment(date).format(Consts.date_format);
    },
    dateView: function(d){
        return moment(d).format("YYYY-MM-DD");
    },
    shortDateView: function(d){
        return moment(d).format("DD.MM");
    },
    shortestDateView: function(d){
        return moment(d).format("DD");
    },
    nameView: function(u){
        if (u.firstname) return `${u.firstname[0].toUpperCase()}.${u.middlename[0].toUpperCase()}. ${u.lastname}`;
    }
}

export {utils, Consts};