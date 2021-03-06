/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

/**
 * This is the main application class of your custom application "tweets"
 *
 * @asset(tweets/*)
 */
qx.Class.define("tweets.Application",
{
  extend : qx.application.Standalone,

  /*
   *****************************************************************************
     MEMBERS
   *****************************************************************************
   */
  members : {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
          -------------------------------------------------------------------------
            Below is your actual application code...
          -------------------------------------------------------------------------
          */

      // Document is the application root
      var doc = this.getRoot();

      // service stuff
      var service = new tweets.IdenticaService();
      service.addListener("changeTweets", function(e) {
        this.debug(qx.dev.Debug.debugProperties(e.getData()));
      }, this);

      // main window stuff
      var main = new tweets.MainWindow();
      main.addListener("reload", function() {
        service.fetchTweets();
      }, this);
      main.addListener("post", function(e) {
        this.debug("post: " + e.getData());
      }, this);

      // create the controler
      var list = main.getList();
      list.setItemHeight(68);
      list.setLabelPath("text");
      list.setIconPath("user.profile_image_url");
      list.setDelegate( {
        configureItem : function(item)
        {
          item.getChildControl("icon").setWidth(48);
          item.getChildControl("icon").setHeight(48);
          item.getChildControl("icon").setScale(true);
          item.setRich(true);
        }
      });
      service.bind("tweets", list, "model", {
        converter : function(value) {
          return value || new qx.data.Array();
        }
      });
      this.__loginWindow = new tweets.LoginWindow();
      this.__loginWindow.addListener("changeLoginData", function(ev)
      {
        var loginData = ev.getData();
        service.fetchTweets(loginData.username, loginData.password);
      });
      this.__loginWindow.moveTo(320, 30);
      this.__loginWindow.open();
      main.open();
      main.moveTo(50, 30);

      // kickstart
      service.fetchTweets();
    }
  }
});
