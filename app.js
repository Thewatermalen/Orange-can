// app.js
App({

    onLaunch:function(){
        var storageData = wx.getStorageSync('postList');
            if (!storageData) {
                //如果缓存不存在
                var dataObj = require("data/data.js")
                wx.clearStorageSync();
                wx.setStorageSync('postList', dataObj.postList);
            }
            this._getUserInfo();
    },

    globalData:{
      g_isPlayingMusic:false,
      g_currentMusicPostId:null,
      image_base:'https://image.tmdb.org/t/p/w500',
      API_KEY:'5d054017b411dba183800c320b995c5c',
      tmdbBase:'https://api.themoviedb.org',
      g_userInfo:null
    },

    _getUserInfo:function(){
      var userInfoStorage = wx.getStorageSync('user');
      if(!userInfoStorage){
        //如果缓存中没有用户信息，就获取用户信息
        var that = this;
        wx.login({ 
          success:function (){
            wx.getUserInfo({
              success:function(res){
                that.globalData.g_userInfo = res.userInfo;
                //将用户的基本信息保存到缓存中
                wx.setStorageSync('user', res.userInfo);
              },
              fail:function(res){
                console.log(res);
              }
            })
          }
        })
      }
      else{
        //如果缓存中已经存在用户的基本信息，那么将信息保存到全局变量中
        this.globalData.g_userInfo = userInfoStorage;
      }
    }

})
