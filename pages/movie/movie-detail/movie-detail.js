// pages/movie/movie-detail/movie-detail.js
var util = require('../../../util/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var detailUrl = app.globalData.tmdbBase + `/3/movie/${movieId}?language=zh-CN`;
    var creditsUrl = app.globalData.tmdbBase + `/3/movie/${movieId}/credits?language=zh-CN`;
    // 使用 Promise.all 等待两个请求完成
    Promise.all([
      this.http(detailUrl),
      this.http(creditsUrl)
    ]).then(([detailData, creditsData]) => {
      // 数据都返回后，构建 mergeMovieData
      var mergeMovieData = {
        detail: detailData,
        cast: creditsData
      };
      console.log(mergeMovieData);
      this.processTmdbData(mergeMovieData);
    }).catch(error => {
      console.error("Error fetching movie data:", error);
    });
  },

  http:function(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        header: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDA1NDAxN2I0MTFkYmExODM4MDBjMzIwYjk5NWM1YyIsIm5iZiI6MTc0Nzk4MTU1Mi40OTIsInN1YiI6IjY4MzAxNGYwMDc5YTQyZTI4NzAzNjNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tnPkjDm0iqnGLctkQ6bOhW1IZZc9qQb6gnPvDN_gxr8',
        },
        success: function(res) {
          resolve(res.data);
        },
        fail: function(error) {
          reject(error);
        },
        complete: function() {
          wx.hideNavigationBarLoading();
        }
      });
    });
  },

  processTmdbData: function (data) {
    var director = {
      avatar: "",
      name: "",
      id: "",
    }
    if (data.detail.production_companies[0] != null) {
      if (data.detail.production_companies[0].logo_path != null) {
        director.avatar = app.globalData.tmdbBase + data.detail.production_companies[0].logo_path
      }
      director.name = data.detail.production_companies.name;
      director.id = data.detail.production_companies.id;
    }
    var movie = {
      movieImg: app.globalData.image_base + data.detail.poster_path,
      country: data.detail.origin_country,
      title: data.detail.title,
      originalTitle: data.detail.original_title,
      wishCount: data.detail.vote_count,
      commentCount: 90,
      year: data.detail.release_date.slice(0,4),
      generes: data.detail.genres[0].name,
      stars: util.convertToStarsArray(data.detail.vote_average), 
      score: data.detail.vote_average,
      director: data.detail.production_companies[0],
      casts: util.convertToCastString(data.cast.cast),
      castsInfo: util.convertToCastInfos(data.cast.cast),
      summary: data.detail.overview,
    }
    this.setData({
      movie: movie
    })
    wx.setNavigationBarTitle({
      title: data.detail.title,
    })
  },

  //预览电影海报
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src],
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