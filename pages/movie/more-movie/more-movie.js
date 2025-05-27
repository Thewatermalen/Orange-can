var app = getApp();
var util = require('../../../util/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      movies:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(options) {
      var category = options.category;
      var dataUrl = "";
      switch(category){
        case "正在热映":
          dataUrl = app.globalData.tmdbBase + "/3/movie/now_playing" + "?language=zh-CN&page=1";
          break;
        case "即将上映":
          dataUrl = app.globalData.tmdbBase + "/3/movie/upcoming" + "?language=zh-CN&page=1";
          break;
        case "TMDB高分":
          dataUrl = app.globalData.tmdbBase + "/3/movie/top_rated" + "?language=zh-CN&page=1";
          break;
      }
      this.data.requestUrl = dataUrl;
      util.http(dataUrl,this.processTmdbData)
    },

    processTmdbData:function(moviesTmdb){
      var movies= [];
      //for中的代码将所有tmdb电影数据转化成我们需要的格式
      for(var idx in moviesTmdb.results){
        var result = moviesTmdb.results[idx];
        var title = result.original_title;
        if(title.length >= 13){
          //电影标题只取前12个字符
          title = title.substring(0,13) + "...";
        } 
        var temp = {
          stars:util.convertToStarsArray(result.vote_average),
          title:title,
          average:result.vote_average,
          coverageUrl:app.globalData.image_base + result.poster_path,
          movieId:result.id
        }
        movies.push(temp)
      }
      this.setData({
        movies:movies
      });
      wx.stopPullDownRefresh();
    },

    onPullDownRefresh:function(event){
      var refreshUrl = this.data.requestUrl;
      util.http(refreshUrl,this.processTmdbData);
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