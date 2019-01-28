# -*- coding: utf-8 -*-
from flask import render_template, jsonify, Blueprint, redirect, request, abort
import datetime as dt
from sqlalchemy import func
import json

import calendar_service.ttypes as tt

from app import transport, client
from app import current_user
# главная страница
def index():
    return render_template("index.html")

def extractInt(data, col):
    r = data.get(col, None)
    if r: r = int(r)
    return r

def get_init_data():
    if not transport.isOpen(): transport.open()
    users = json.loads(client.get_users())
    new_events_counter = json.loads(client.get_new_events())
    transport.close()

    return jsonify({
        "users": users,
        "new_events_counter": len(new_events_counter)
    })

def get_user():
    if not transport.isOpen(): transport.open()
    user = json.loads(client.get_user(current_user["uid"]))
    transport.close()
    return jsonify({"user":user})

def get_users_event_stat():
    if not transport.isOpen(): transport.open()
    stat = json.loads(client.get_users_events_stat())
    transport.close()
    return jsonify({"stat":stat})

def get_today_info():
    if not transport.isOpen(): transport.open()
    birthday = json.loads(client.get_today_birthday())
    vacation = json.loads(client.get_today_vacation())
    holiday = json.loads(client.get_today_holiday())
    duty = json.loads(client.get_today_duty())
    transport.close()
    return jsonify({"today_birthday":birthday, "today_vacation": vacation, "today_holiday":holiday, "today_duty": duty})

def get_range(f, count):
    f_dt = dt.datetime.strptime(f, "%Y-%m-%d %H:%M:%S").date()
    t = (f_dt + dt.timedelta(days=int(count))).strftime("%Y-%m-%d %H:%M:%S")

    if not transport.isOpen(): transport.open()
    events = json.loads(client.get_events(f,t))
    weekends = json.loads(client.get_weekends(f,t))
    transport.close()
    return jsonify({"events": events, "weekends": weekends})

def get_tasks():
    if not transport.isOpen(): transport.open()
    tasks = json.loads(client.get_user_tasks(current_user["uid"]))
    transport.close()
    return jsonify({"tasks": tasks})

def get_task(tid):
    if not transport.isOpen(): transport.open()
    task = json.loads(client.get_task(int(tid)))
    transport.close()
    return jsonify({"task": task})

def create_task():
    post = request.get_json()
    entity = tt.Task()
    try:
        if not transport.isOpen(): transport.open()
        entity.ttype = extractInt(post, "ttype")
        entity.creator = current_user["uid"]
        entity.owner = extractInt(post, "owner") or current_user["uid"]
        entity.title = post.get("title", None)
        entity.description = post.get("description", None)
        entity.dt_created = post.get("dt_created", None)
        entity.deadline = post.get("deadline", None)
        if post["ttype"] == tt.TaskType.TASK: entity.priority = extractInt(post, "priority")
        else: entity.priority = tt.TaskPriority.LOW
        client.add_task(entity)
        transport.close()
    except Exception as e:
        transport.close()
        print(repr(e))
        abort(500)

    return jsonify({
            "status": "ok",
            "msg": "Успешно добавлено"
    })

def edit_task(tid):
    task = json.dumps(request.get_json())
    try:
        if not transport.isOpen(): transport.open()
        client.edit_task(int(tid), task)
        transport.close()
    except Exception as e:
        transport.close()
        print(repr(e))
        abort(500)

    return jsonify({
            "status": "ok",
            "msg": "Успешно сохранено"
    })

def create_event():
    post = request.get_json()
    entity = tt.Event()
    try:
        if not transport.isOpen(): transport.open()
        if (post.get("user", None)): entity.user = extractInt(post, "user")
        else: entity.user = current_user["uid"]
        entity.etype = extractInt(post, "etype")
        entity.status = tt.EventStatus.NEW
        if entity.etype == tt.EventType.DUTY: entity.status = tt.EventStatus.ACCEPT
        entity.dt_start = post["dt_start"]
        entity.dt_end = post.get("dt_end", None)
        entity.hours = extractInt(post, "hours")
        entity.comment = post.get("comment", None)
        client.add_event(entity)
        transport.close()
    except Exception as e:
        transport.close()
        print(repr(e))
        abort(500)

    return jsonify({
            "status": "ok",
            "msg": "Успешно добавлено"
    })


def edit_event(eid):
    data = json.dumps(request.get_json())
    try:
        if not transport.isOpen(): transport.open()
        client.edit_event(int(eid), data)
        transport.close()
    except Exception as e:
        transport.close()
        print(repr(e))
        abort(500)

    return jsonify({
            "status": "ok",
            "msg": "Успешно сохранено"
    })

def get_user_events():
    if not transport.isOpen(): transport.open()
    events = json.loads(client.get_user_events(current_user["uid"]))
    transport.close()
    return jsonify({"events": events})

def get_new_events():
    if not transport.isOpen(): transport.open()
    events = json.loads(client.get_new_events())
    transport.close()
    return jsonify({"events": events})

def set_event_status():
    data = request.get_json()
    try:
        if not transport.isOpen(): transport.open()
        eid = int(data.get("eid", None))
        status = int(data.get("status", None))
        client.set_event_status(eid, status)
        transport.close()
    except Exception as e:
        transport.close()
        print(repr(e))
        abort(500)
    return jsonify({
            "status": "ok",
            "msg": "Успешно сохранено"
    })

def set_task_status(tid, status):
    pass

def test():
    if not transport.isOpen(): transport.open()
    client.users_stat()
    transport.close()
    return "ok"

main_module = Blueprint('main', __name__, url_prefix='')


main_module.route('/')(index)
main_module.route('/get_init_data')(get_init_data)
main_module.route('/get_range/<f>/<count>')(get_range)
main_module.route('/get_tasks')(get_tasks)
main_module.route('/get_task/<tid>')(get_task)
main_module.route('/get_event/<tid>')(get_task)
main_module.route('/get_current_user')(get_user)
main_module.route('/get_user_events')(get_user_events)
main_module.route('/get_users_event_stat')(get_users_event_stat)
main_module.route('/get_today_info')(get_today_info)
main_module.route('/get_new_events')(get_new_events)
main_module.route('/set_task_status', methods=["post"])(set_task_status)
main_module.route('/set_event_status', methods=["post"])(set_event_status)
main_module.route('/create_task', methods=["post"])(create_task)
main_module.route('/create_event', methods=["post"])(create_event)
main_module.route('/edit_event/<eid>', methods=["post"])(edit_event)

main_module.route('/edit_task/<tid>', methods=["post"])(edit_task)
main_module.route('/test')(test)