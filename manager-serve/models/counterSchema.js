/**
 * 维护用户ID自增长表
 */


const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    _id: String,
    sequence_value: Number
})


//第一个参数是集合model的名称 第三个参数是集合在数据库里的名称
module.exports = mongoose.model("counter",userSchema,"counters");
