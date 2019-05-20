const mongoose = require('mongoose');
const crypto = require('crypto');
const sha256=require('sha256');
const _ = require('lodash');
const config = require('../config/default');

const userSchema = new mongoose.Schema({
    myStartupId:{
        type:String,
        default:"no"
    },
    email:{
        type:String,
        unique:   true,
        required: true
    },
    competence:{
      type:Array
    },
    name:{
        type:String
    },
    surName:{
        type:String
    },
    description:{
        type:String
    },
    photo:{
        type:String
    },
    contacts:{
        type:String
    },
    notifications:{
        type:Array
    }
,
  passwordHash: {
    type: String,
    required: true
  },
  salt: {
    required: true,
    type: String
  }
}, {
  timestamps: true
});


userSchema.virtual('password')
  .set(function(password) {

    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha256'
      ).toString('base64');
    } else {

      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });

//Виртуальное поле для проверки пароля
userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
    var ph256=sha256(password);
    const passwordHash = crypto.pbkdf2Sync(
    ph256,
    this.salt,
    config.crypto.hash.iterations,
    config.crypto.hash.length,
    'sha256'
  ).toString('base64');

  return passwordHash === this.passwordHash;

};

userSchema.methods.getPublicFields = function() {
  return {
    username: this.username,

  };

};

userSchema.methods.getId=function () {
    return this._id;
}

module.exports = mongoose.model('User', userSchema);
