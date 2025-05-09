// pages/post/post-comment/post-comment.js
import { DBPost, DBpost } from '../../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制使用键盘还是发送语音
    useKeyboardFlag: true,
    //控制是否显示图片选择面板  
    sendMoreMsgFlag: false,
    //控制input组件的初始值
    keyboardInputValue: '',
    //保存已选择的图片
    chooseFiles: [],
    //被删除的图片序号
    deleteIndex:-1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();
    //绑定评论数据
    this.setData({
      comments: comments
    })
  },

  //显示选择照片、拍照等按钮
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },

  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  //预览图片
  previewImg: function (event) {
    //获取评论号
    var commentIdx = event.currentTarget.dataset.commentIdx,
      //获取图片在图片数组中的序号
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论的全部图片
      imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx],//当前显示图片的http链接
      urls: imgs
    })
  },

  bindCommentInput: function (event) {
    var val = event.detail.value;
    console.log(val);
    this.data.keyboardInputValue = val;
  },

  //提交用户评论
  submitComment: function (event) {
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      //评论时间
      create_time: new Date().getTime() / 1000,
      //评论内容
      content: {
        txt: this.data.keyboardInputValue
      },
    };
    if (!newData.content.txt) {
      //如果没有评论内容，就不执行任何操作
      return;
    }
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);
    //显示操作结果
    this.showCommitSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },

  showCommitSuccessToast: function () {
    //显示操作结果
    wx.showToast({
      title: "评论成功",
      duration: 1000,
      icon: "success"
    })
  },

  bindCommentData: function () {
    var comments = this.dbPost.getCommentData();
    //绑定评论数据
    this.setData({
      comments: comments
    });
  },

  //将所有相关的按钮状态，输入状态都恢复到初始状态
  resetAllDefaultStatus: function () {
    //清空评论框
    this.setData({
      keyboardInputValue: ''
    })
  },

  //选择本地照片与拍照
  chooseImage: function (event) {
    //已选择图片数组
    var imgArr = this.data.chooseFiles;
    //只能上传3张照片,包括拍照
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    wx.chooseMedia({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        //可以分次选择图片,但总数不能超过3张
        console.log(res)
        const pathArr = res.tempFiles.map(item => item.tempFilePath)
        that.setData({
          chooseFiles: imgArr.concat(pathArr)
        });
      }
    })
  },

  //删除已经选择的图片
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex:index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function(){
      that.setData({
        deleteIndex:-1,
        chooseFiles: that.data.chooseFiles,
      });
    },500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})  