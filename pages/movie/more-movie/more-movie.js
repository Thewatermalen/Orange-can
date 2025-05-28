var app = getApp();
var util = require('../../../util/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    currentPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.tmdbBase + "/3/movie/now_playing?language=zh-CN&page=" + `${this.data.currentPage}`;
        break;
      case "即将上映":
        dataUrl = app.globalData.tmdbBase + "/3/movie/upcoming?language=zh-CN&page=" + `${this.data.currentPage}`;
        break;
      case "TMDB高分":
        dataUrl = app.globalData.tmdbBase + "/3/movie/top_rated?language=zh-CN&page=" + `${this.data.currentPage}`;
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processTmdbData)
    //显示loading状态
    wx.showNavigationBarLoading();
  },

  processTmdbData: function (moviesTmdb) {
    var movies = [];
    //for中的代码将所有tmdb电影数据转化成我们需要的格式
    for (var idx in moviesTmdb.results) {
      var result = moviesTmdb.results[idx];
      var title = result.original_title;
      if (title.length >= 7) {
        //电影标题只取前12个字符
        title = title.substring(0, 7) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(result.vote_average),
        title: title,
        average: result.vote_average,
        coverageUrl: `${result.poster_path? app.globalData.image_base + result.poster_path:"/images/post/null.png"}`,
        movieId: result.id
      }
      movies.push(temp)
    }
    var totalMovies = [];
    totalMovies = this.data.movies.concat(movies);
    this.setData({
      movies: totalMovies
    });
    wx.stopPullDownRefresh();
  },

  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl;
    this.data.movies = [];
    this.data.currentPage = 1;
    util.http(refreshUrl, this.processTmdbData);
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: `../movie-detail/movie-detail?id=${movieId}`,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {
    
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function() {
    this.data.currentPage += 1;
    //拼接下一组数据的URL
    var nextUrl = this.data.requestUrl + `${this.data.currentPage}`;
    util.http(nextUrl,this.processTmdbData)
    //显示loading状态
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})