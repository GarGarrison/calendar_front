# -*- coding: utf-8 -*-
import sys
sys.path.append("/home/garrison/Dropbox/work/calendar_service/gen-py")

from flask import Flask, render_template

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol, TJSONProtocol

from calendar_service import CalendarManager

transport = TSocket.TSocket('localhost', 8080)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)
# protocol = TJSONProtocol.TJSONProtocol(transport)
client = CalendarManager.Client(protocol)

app = Flask(__name__)
app.config.from_object('config')

current_user = {
    "uid": 111111,
    "role": "boss"
}

@app.errorhandler(404)
def err404(e):
    return render_template("404.html"), 404

# from app.controllers.AdminController import admin_module
from app.controllers.MainController import main_module
# from app.controllers.CalendarController import calendar_module
# from app.controllers.DashController import dash_module
# from app.controllers.TaskController import tasks_module

app.register_blueprint(main_module)
# app.register_blueprint(admin_module)
# app.register_blueprint(calendar_module)
# app.register_blueprint(dash_module)
# app.register_blueprint(tasks_module)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
