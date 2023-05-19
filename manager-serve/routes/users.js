/**
 * 用户管理模块
 */

const router = require('koa-router')()
const User = require('../models/userSchema')
const util = require('../Utils/util')
const jwt = require('jsonwebtoken')
const Counter = require('../models/counterSchema')
const md5 = require('md5');
router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    /**
     * 返回数据库指定字段，有三种方式
     * 1. 'userId userName userEmail state role deptId roleList'
     * 2. {userId:1,_id:0}  1代表返回 0代表不返回   
     * 3. select('userId')
     */
   
    const res = await User.findOne({
      userName,
      userPwd: userPwd
    }, 'userId userName userEmail state role deptId roleList')
// console.log('res======>',res)
    if (res) {

      const data = res._doc;
   // console.log(data);
      const token = jwt.sign({
        data
      },'miyao', { expiresIn: '1h'})
      data.token = token;
      ctx.body = util.success(data)
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})


//用户列表
router.get('/list',async(ctx)=>{
  const {  userId,userName,state } =ctx.request.query;
  console.log('ctx.request.query',ctx.request.query)
  const {page,skipIndex } = util.pager(ctx.request.query);
  let params = {}
console.log('要查询的userId',userId);
  if (userId)  params.userId = userId;
  if (userName) params.userName = userName;
  if (state && state != '0') params.state = state;
  try {
    // 根据条件查询所有用户列表
    const query = User.find(params, { _id: 0, userPwd: 0 })
    
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.countDocuments(params);
   console.log("total",total);
    ctx.body = util.success({
      // 接口返回值
      page: {
        ...page,
        total
      },
      list

    })
    console.log('要查询的params',params);
  } catch (error) {
    ctx.body = util.fail(`查询异常:${error.stack}`)
  }
})

//用户删除/批量删除
router.post('/delete',async (ctx)=>{
  //待删除的userId数组
  const userIds= ctx.request.body.params.userIds;
 // console.log(' ctx.request.body==',ctx.request.body);
  console.log('要删除的userIds',userIds);
 const res = await User.updateMany({userId:{$in: userIds}},{state:2});
 if(res.nModified){
  ctx.body = util.success(res,`共删除成功${res.nModified}条`);
  return;
 }
 ctx.body = util.fail('删除失败')
})
// 用户新增/编辑
router.post('/operate', async (ctx) => {
  const { userId, userName, userEmail, mobile, job, state, roleList, deptId, action } = ctx.request.body;
  console.log('action',action);
  if (action == 'add') {
    if (!userName || !userEmail || !deptId) {
      ctx.body = util.fail('参数错误', util.CODE.PARAM_ERROR)
      return;
    }
    
    
    const res = await User.findOne({ $or: [{ userName }, { userEmail }] }, '_id userName userEmail');
    console.log('新增/编辑按钮中 User集合中找到的_id userName userEmail',res);
    if (res) {
      ctx.body = util.fail(`系统监测到有重复的用户，信息如下：${res.userName} - ${res.userEmail}`)
    } else {
      //每次查找集合id 给它加一  最后一个参数 表示给它返回一个新的文档
      const doc = await Counter.findOneAndUpdate({ _id: 'userId' }, { $inc: { sequence_value: 1 } }, { new: true })
      console.log('doc=>',doc);
      try {
        const user = new User({
          userId: doc.sequence_value,
          userName,
          userPwd: md5('123456'),
          userEmail,
          role: 1, //默认普通用户
          roleList,
          job,
          state,
          deptId,
          mobile
        })
        user.save();
        ctx.body = util.success('', '用户创建成功');
      } catch (error) {
        ctx.body = util.fail(error.stack, '用户创建失败');
      }
    }
  } else {
    if (!deptId) {
      ctx.body = util.fail('部门不能为空', util.CODE.PARAM_ERROR)
      return;
    }
    try {
      const res = await User.findOneAndUpdate({ userId }, { mobile, job, state, roleList, deptId, })
      ctx.body = util.success({}, '更新成功')
    } catch (error) {
      ctx.body = util.fail(error.stack, '更新失败')
    }
  }
})
module.exports = router;