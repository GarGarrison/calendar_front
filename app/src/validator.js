const RuleTypes = {
    INT: /^[0-9]{1,}$/, // целое число
    STRING: /[a-zA-Zа-яА-Я]{1,}$/, // строка
    TEXT: /.{1,}$/, // любой не пустой текст из любого кол-ва символов
    DATE: /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/ // дата ГГГГ-мм-ДД ЧЧ:ММ:СС
}

let Validator = {
    checkUndefined: function(x){
        return x ? x : "";
    },
    validate: function(entity, rules){
        var problems = {};
        // проходим по всем правилам
        for (var k in rules) {
            var entity_value  = this.checkUndefined(entity[k]);
            // если в правиле есть раздел condition, то проверяем сначала его (например поле должно быть обязательным только если другое заполнено)
            var conditions = rules[k].condition;
            if (conditions) {
                var result_of_conditions = true;
                // проходим по всем условиям
                for (var condition of conditions) {
                    var entity_condition_value  = this.checkUndefined(entity[condition.key]);
                    // если хотя бы условие condition не выполнено, то общая проверка false
                    if ( !condition.func(entity_condition_value) ) result_of_conditions = result_of_conditions && false;
                }
                // если все условия выполнены, то тогда проверяем это поле
                if (result_of_conditions) {
                    if ( !rules[k].regex.test(entity_value) ) problems[k] = rules[k].text;
                }
            }
            else if ( !rules[k].regex.test(entity_value) ) problems[k] = rules[k].text;
        }
        return problems;
    }
}

export {RuleTypes, Validator}