// pages/setting/device/device.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      phoneInfo:[],
      softInfo:[],
      screenInfo:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(options) {
      var deviceInfo = wx.getDeviceInfo();
      var appBaseInfo = wx.getAppBaseInfo();
      var windowInfo = wx.getWindowInfo();
      this.setData({
        phoneInfo:[
          {key:"手机型号",val:deviceInfo.model},
          {key:"手机语言",val:appBaseInfo.language}
        ],
        softInfo:[
          {key:"微信版本",val:appBaseInfo.version},
          {key:"操作系统版本",val:deviceInfo.system},
          {key:"客户端平台",val:deviceInfo.platform}
        ],
        screenInfo:[
          {key:"屏幕像素比",val:windowInfo.pixelRatio},
          {key:"屏幕尺寸",val:windowInfo.screenWidth + '×' + windowInfo.screenHeight},
          {key:"窗口尺寸",val:windowInfo.windowWidth + '×' + windowInfo.windowHeight},
        ]
      })
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