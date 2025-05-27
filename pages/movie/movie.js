const util = require("../../util/util");
var app = getApp();
// pages/movie/movie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      inTheaters:{},
      comingSoon:{},
      top250:{}
    },

    getMovieListData:function(url,settedKey,categoryTitle){
      var that = this;
      wx.request({
        url: url,
        method: 'GET',
        header: {
          Accept:'application/json',
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDA1NDAxN2I0MTFkYmExODM4MDBjMzIwYjk5NWM1YyIsIm5iZiI6MTc0Nzk4MTU1Mi40OTIsInN1YiI6IjY4MzAxNGYwMDc5YTQyZTI4NzAzNjNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tnPkjDm0iqnGLctkQ6bOhW1IZZc9qQb6gnPvDN_gxr8',
        },
        success:function(res){
          that.processTmdbData(res.data,settedKey,categoryTitle)
        },
        fail:function(error) {
          //fail
          console.log(error)
        }
      })
    },

    processTmdbData:function(movieTmdb,settedKey,categoryTitle){
      var movies = [];
      //for中的代码将所有tmdb电影数据转化成我们需要的格式
      for(var i=0; i<3;i++){
        var result = movieTmdb.results[i];
        var title = result.original_title;
        if(title.length >= 12){
          //电影标题只取前12个字符
          title = title.substring(0,12) + "...";
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
      var readyData = {};
      readyData[settedKey] = {
        categoryTitle:categoryTitle,
        movies:movies
      }
      this.setData(readyData);
      console.log(readyData);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(event) {
      var inTheatersUrl = app.globalData.tmdbBase + "/3/movie/now_playing" + "?language=zh-CN&page=1";
      var comingSoonUrl = app.globalData.tmdbBase + "/3/movie/upcoming" + "?language=zh-CN&page=1";
      var top250Url = app.globalData.tmdbBase + "/3/movie/top_rated" + "?language=zh-CN&page=1";

      this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
      this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
      this.getMovieListData(top250Url,"top250","TMDB高分");
    },

    onMoreTap:function(event){
      var category = event.currentTarget.dataset.category;
      wx.navigateTo({
        url: 'more-movie/more-movie?category=' + category,
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