import {
    DBPost
} from '../../../db/DBPost.js';

// pages/post/post-detail/post-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    onCollectionTap: function (event) {
        //dbpost对象已经在onload函数里被保存到了this变量中，无须再次实例化
        var newData = this.dbPost.collect();

        //有选择的更新部分数据
        this.setData({
            'post.collectionStatus': newData.collectionStatus,
            'post.collectionNum': newData.collectionNum
        })
        //交互反馈
        wx.showToast({
            title: newData.collectionStatus ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success",
            mask: true
        })
    },

    onUpTap: function (event) {
        //dbpost对象已经在onload函数里被保存到了this变量中，无须再次实例化
        var newData = this.dbPost.up();

        //有选择的更新部分数据
        this.setData({
            'post.upStatus': newData.upStatus,
            'post.upNum': newData.upNum
        })
        //交互反馈
        wx.showToast({
            title: newData.upStatus ? "点赞成功" : "取消成功",
            duration: 1000,
            icon: "success",
            mask: true
        })
    },

    onCommentTap:function(event){
        var id = event.currentTarget.dataset.postId;
        wx.navigateTo({
          url: '../post-comment/post-comment?id=' + id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var postId = options.id;
        this.dbPost = new DBPost(postId);
        this.postData = this.dbPost.getPostItemById().data;
        this.setData({
            post: this.postData
        })
        this.addReadingTimes();
    },

    //阅读数+1
    addReadingTimes:function (){
      this.dbPost.addReadingTimes();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.postData.title,
        })
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