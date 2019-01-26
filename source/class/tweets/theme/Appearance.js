/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */
qx.Theme.define("tweets.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,
  appearances :
  {
    "tweet-view" : {

    },
    "tweet-view/time" : {
      style : function() {
        return {
          textColor : "tweet-time"
        }
      }
    },
    "toolbar" : {
      style : function() {
        return {
          backgroundColor : "window-border-inner"
        }
      }
    }
  }
});
