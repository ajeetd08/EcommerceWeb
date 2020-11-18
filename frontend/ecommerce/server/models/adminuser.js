const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AdminUser = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String},
    createsAt: {type: String, default: Date.now()}
})

module.exports = mongoose.model('AdminUser', AdminUser);