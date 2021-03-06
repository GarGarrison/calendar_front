//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


RankType = {
'NUB' : 1,
'OBERNUB' : 2,
'BOSS' : 3
};
TaskStatus = {
'CREATED' : 1,
'OPENED' : 2,
'CLOSED' : 3
};
Priority = {
'HIGH' : 1,
'MID' : 2,
'LOW' : 3
};
AbsenceReason = {
'HOLIDAY' : 1,
'HOURS' : 2,
'ILL' : 3,
'BUSINESS' : 4
};
User = function(args) {
  this.uid = null;
  this.firstname = null;
  this.middlename = null;
  this.lastname = null;
  this.phone = null;
  this.phone_mobile = null;
  this.contract_start = null;
  this.contract_end = null;
  this.rank = null;
  if (args) {
    if (args.uid !== undefined) {
      this.uid = args.uid;
    }
    if (args.firstname !== undefined) {
      this.firstname = args.firstname;
    }
    if (args.middlename !== undefined) {
      this.middlename = args.middlename;
    }
    if (args.lastname !== undefined) {
      this.lastname = args.lastname;
    }
    if (args.phone !== undefined) {
      this.phone = args.phone;
    }
    if (args.phone_mobile !== undefined) {
      this.phone_mobile = args.phone_mobile;
    }
    if (args.contract_start !== undefined) {
      this.contract_start = args.contract_start;
    }
    if (args.contract_end !== undefined) {
      this.contract_end = args.contract_end;
    }
    if (args.rank !== undefined) {
      this.rank = args.rank;
    }
  }
};
User.prototype = {};
User.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.uid = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.firstname = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.middlename = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.lastname = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.phone = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.phone_mobile = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.contract_start = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.contract_end = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.I32) {
        this.rank = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

User.prototype.write = function(output) {
  output.writeStructBegin('User');
  if (this.uid !== null && this.uid !== undefined) {
    output.writeFieldBegin('uid', Thrift.Type.I32, 1);
    output.writeI32(this.uid);
    output.writeFieldEnd();
  }
  if (this.firstname !== null && this.firstname !== undefined) {
    output.writeFieldBegin('firstname', Thrift.Type.STRING, 2);
    output.writeString(this.firstname);
    output.writeFieldEnd();
  }
  if (this.middlename !== null && this.middlename !== undefined) {
    output.writeFieldBegin('middlename', Thrift.Type.STRING, 3);
    output.writeString(this.middlename);
    output.writeFieldEnd();
  }
  if (this.lastname !== null && this.lastname !== undefined) {
    output.writeFieldBegin('lastname', Thrift.Type.STRING, 4);
    output.writeString(this.lastname);
    output.writeFieldEnd();
  }
  if (this.phone !== null && this.phone !== undefined) {
    output.writeFieldBegin('phone', Thrift.Type.STRING, 5);
    output.writeString(this.phone);
    output.writeFieldEnd();
  }
  if (this.phone_mobile !== null && this.phone_mobile !== undefined) {
    output.writeFieldBegin('phone_mobile', Thrift.Type.STRING, 6);
    output.writeString(this.phone_mobile);
    output.writeFieldEnd();
  }
  if (this.contract_start !== null && this.contract_start !== undefined) {
    output.writeFieldBegin('contract_start', Thrift.Type.STRING, 7);
    output.writeString(this.contract_start);
    output.writeFieldEnd();
  }
  if (this.contract_end !== null && this.contract_end !== undefined) {
    output.writeFieldBegin('contract_end', Thrift.Type.STRING, 8);
    output.writeString(this.contract_end);
    output.writeFieldEnd();
  }
  if (this.rank !== null && this.rank !== undefined) {
    output.writeFieldBegin('rank', Thrift.Type.I32, 9);
    output.writeI32(this.rank);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Task = function(args) {
  this.id = null;
  this.status = null;
  this.priority = null;
  this.user = null;
  this.title = null;
  this.description = null;
  this.dt_start = null;
  this.deadline = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.status !== undefined) {
      this.status = args.status;
    }
    if (args.priority !== undefined) {
      this.priority = args.priority;
    }
    if (args.user !== undefined) {
      this.user = args.user;
    }
    if (args.title !== undefined) {
      this.title = args.title;
    }
    if (args.description !== undefined) {
      this.description = args.description;
    }
    if (args.dt_start !== undefined) {
      this.dt_start = args.dt_start;
    }
    if (args.deadline !== undefined) {
      this.deadline = args.deadline;
    }
  }
};
Task.prototype = {};
Task.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.status = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.priority = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.user = new User();
        this.user.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.title = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.description = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.dt_start = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.deadline = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Task.prototype.write = function(output) {
  output.writeStructBegin('Task');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.status !== null && this.status !== undefined) {
    output.writeFieldBegin('status', Thrift.Type.I32, 2);
    output.writeI32(this.status);
    output.writeFieldEnd();
  }
  if (this.priority !== null && this.priority !== undefined) {
    output.writeFieldBegin('priority', Thrift.Type.I32, 3);
    output.writeI32(this.priority);
    output.writeFieldEnd();
  }
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.STRUCT, 4);
    this.user.write(output);
    output.writeFieldEnd();
  }
  if (this.title !== null && this.title !== undefined) {
    output.writeFieldBegin('title', Thrift.Type.STRING, 5);
    output.writeString(this.title);
    output.writeFieldEnd();
  }
  if (this.description !== null && this.description !== undefined) {
    output.writeFieldBegin('description', Thrift.Type.STRING, 6);
    output.writeString(this.description);
    output.writeFieldEnd();
  }
  if (this.dt_start !== null && this.dt_start !== undefined) {
    output.writeFieldBegin('dt_start', Thrift.Type.STRING, 7);
    output.writeString(this.dt_start);
    output.writeFieldEnd();
  }
  if (this.deadline !== null && this.deadline !== undefined) {
    output.writeFieldBegin('deadline', Thrift.Type.STRING, 8);
    output.writeString(this.deadline);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Reminder = function(args) {
  this.id = null;
  this.title = null;
  this.description = null;
  this.dt_created = null;
  this.deadline = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.title !== undefined) {
      this.title = args.title;
    }
    if (args.description !== undefined) {
      this.description = args.description;
    }
    if (args.dt_created !== undefined) {
      this.dt_created = args.dt_created;
    }
    if (args.deadline !== undefined) {
      this.deadline = args.deadline;
    }
  }
};
Reminder.prototype = {};
Reminder.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.title = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.description = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.dt_created = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.deadline = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Reminder.prototype.write = function(output) {
  output.writeStructBegin('Reminder');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.title !== null && this.title !== undefined) {
    output.writeFieldBegin('title', Thrift.Type.STRING, 2);
    output.writeString(this.title);
    output.writeFieldEnd();
  }
  if (this.description !== null && this.description !== undefined) {
    output.writeFieldBegin('description', Thrift.Type.STRING, 3);
    output.writeString(this.description);
    output.writeFieldEnd();
  }
  if (this.dt_created !== null && this.dt_created !== undefined) {
    output.writeFieldBegin('dt_created', Thrift.Type.STRING, 4);
    output.writeString(this.dt_created);
    output.writeFieldEnd();
  }
  if (this.deadline !== null && this.deadline !== undefined) {
    output.writeFieldBegin('deadline', Thrift.Type.STRING, 5);
    output.writeString(this.deadline);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Duty = function(args) {
  this.id = null;
  this.user = null;
  this.date = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.user !== undefined) {
      this.user = args.user;
    }
    if (args.date !== undefined) {
      this.date = args.date;
    }
  }
};
Duty.prototype = {};
Duty.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.user = new User();
        this.user.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.date = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Duty.prototype.write = function(output) {
  output.writeStructBegin('Duty');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.STRUCT, 2);
    this.user.write(output);
    output.writeFieldEnd();
  }
  if (this.date !== null && this.date !== undefined) {
    output.writeFieldBegin('date', Thrift.Type.STRING, 3);
    output.writeString(this.date);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ExtraWeekend = function(args) {
  this.id = null;
  this.date = null;
  this.weekend = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.date !== undefined) {
      this.date = args.date;
    }
    if (args.weekend !== undefined) {
      this.weekend = args.weekend;
    }
  }
};
ExtraWeekend.prototype = {};
ExtraWeekend.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.date = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.BOOL) {
        this.weekend = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ExtraWeekend.prototype.write = function(output) {
  output.writeStructBegin('ExtraWeekend');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.date !== null && this.date !== undefined) {
    output.writeFieldBegin('date', Thrift.Type.STRING, 2);
    output.writeString(this.date);
    output.writeFieldEnd();
  }
  if (this.weekend !== null && this.weekend !== undefined) {
    output.writeFieldBegin('weekend', Thrift.Type.BOOL, 3);
    output.writeBool(this.weekend);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

InvalidValueException = function(args) {
  this.error_code = null;
  this.error_msg = null;
  if (args) {
    if (args.error_code !== undefined) {
      this.error_code = args.error_code;
    }
    if (args.error_msg !== undefined) {
      this.error_msg = args.error_msg;
    }
  }
};
Thrift.inherits(InvalidValueException, Thrift.TException);
InvalidValueException.prototype.name = 'InvalidValueException';
InvalidValueException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.error_code = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.error_msg = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

InvalidValueException.prototype.write = function(output) {
  output.writeStructBegin('InvalidValueException');
  if (this.error_code !== null && this.error_code !== undefined) {
    output.writeFieldBegin('error_code', Thrift.Type.I32, 1);
    output.writeI32(this.error_code);
    output.writeFieldEnd();
  }
  if (this.error_msg !== null && this.error_msg !== undefined) {
    output.writeFieldBegin('error_msg', Thrift.Type.STRING, 2);
    output.writeString(this.error_msg);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

