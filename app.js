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
      g_currentMusicPostId:null
    }

})
