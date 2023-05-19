/**
 * 数据库连接
 */

const mongoose = require('mongoose');
const log4js = require('../Utils/log4j')
const config = require('./index');
mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
  
const db = mongoose.connection;

db.on('error',()=>{
log4js.error('***数据库连接失败***')
})
db.on('open',()=>{
    log4js.info('***数据库连接成功***')
    })
    