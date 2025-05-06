// pages/welcome/welcome.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onTapJump:function(event){
        wx.navigateTo({
          url: '../post/post',
          success:function(){
              console.log("jump success")
          },
          fail:function(){
              console.log("jump failed")
          },
          complete:function(){
              console.log("jump complete")
          }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    onHide:function(event) {
        console.log("page is hide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload:function(event) {
        console.log("page is unload")
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