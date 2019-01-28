# -*- coding: utf-8 -*-
from flask import Blueprint, request, render_template, jsonify
import datetime as dt
import sys

def admin():
    return render_template("admin.html")

def get_user(uid):
    try:
        return ""
    except Exception as e:
        return jsonify ({
            "status": "err",
            "msg": str(e)})

admin_module = Blueprint('admin', __name__, url_prefix='/admin')

admin_module.route('/', methods=['GET'])(admin)
admin_module.route('/get_user/<uid>', methods=['GET'])(get_user)