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
            // success:function(res){
            //     //success
            // },
            // fail:function(){
            //     //fail
            // },
            // complete:function(){
            //     //complete
            // }
    },

    globalData:{
      g_isPlayingMusic:false,
      g_currentMusicPostId:null,
      image_base:'https://image.tmdb.org/t/p/w500',
      API_KEY:'5d054017b411dba183800c320b995c5c',
      tmdbBase:'https://api.themoviedb.org'
    }

})
