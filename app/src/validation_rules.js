import {Consts} from './utils'
import {RuleTypes} from './validator'

export default {
    // правила валидации для формы добавления событий
    events: {
        etype: {
            text: "Укажите тип события",
            regex: RuleTypes.INT
        },
        user: {
            text: "Укажите пользователя",
            regex: RuleTypes.INT
        },
        dt_start: {
            text: "Укажите дату начала",
            regex: RuleTypes.DATE
        },
        dt_end: {
            text: "Укажите дату окончания",
            regex: RuleTypes.DATE,
            condition: [
                {
                    key: "etype",
                    func: function(x){return [Consts.EventType.PLANNED_VACATION, Consts.EventType.VACATION, Consts.EventType.HOURS, Consts.EventType.ILL, Consts.EventType.BUSINESS, Consts.EventType.STUDY].includes(x)}
                }
            ]
        },
        hours: {
            text: "Укажите кол-во часов",
            regex: RuleTypes.INT,
            condition: [
                {
                    key: "etype",
                    func: function(x){return [Consts.EventType.ADD_HOURS, Consts.EventType.HOURS].includes(x)}
                }
            ]
        },
        comment: {
            text: "Укажите комментарий",
            regex: RuleTypes.TEXT
        }
    },
    // правила валидации для формы добавления задач
    tasks: {
        title : {
            text: "Укажите название",
            regex: RuleTypes.STRING
        },
        description : {
            text: "Укажите описание",
            regex: RuleTypes.TEXT
        },
        deadline : {
            text: "Укажите дату",
            regex: RuleTypes.DATE
        },
        priority : {
            text: "Укажите приоритет",
            regex: RuleTypes.INT
        },
        owner : {
            text: "Укажите исполнителя",
            regex: RuleTypes.INT,
            condition: [
                {
                    key: "ttype",
                    func: function(x){return x != Consts.TaskType.REMINDER}
                }
            ]
        }
    }
}