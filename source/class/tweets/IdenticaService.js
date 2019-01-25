qx.Class.define("tweets.IdenticaService",{
  extend: qx.core.Object,

  properties: {
    tweets: {
      nullable: true,
      event: "changeTweets"
    }
  },


  members: {
    fetchTweets: function(){
      if(this.__store == null){

        // The following link won't work because https://stackoverflow.com/a/18049842
        // var url = "https://raw.githubusercontent.com/qooxdoo/qooxdoo/master/component/tutorials/tweets/step4.5/source/resource/tweets/service.js";
        // Use this otherone instead as per above SO link
        var url = "https://cdn.jsdelivr.net/gh/qooxdoo/qooxdoo/component/tutorials/tweets/step4.5/source/resource/tweets/service.js"
        this.__store = new qx.data.store.Jsonp();
        this.__store.setCallbackName("callback");
        this.__store.bind("model", this, "tweets");
        this.__store.setUrl(url);
      } else {
        this.__store.reload();
      }
    }
  }
});
