qx.Class.define("tweets.test.IdenticaService",
{
  extend : qx.dev.unit.TestCase,
  members :
  {
    setUp : function() {
      this.__identicaService = new tweets.IdenticaService();
    },
    tearDown : function()
    {
      this.__identicaService.dispose();
      this.__identicaService = null;
    },
    testFetchTweets : function()
    {
      this.__identicaService.addListener("changeTweets", function() {
        this.resume();
      }, this);
      qx.event.Timer.once(function()
      {
        this.debug("running fetchTweets");
        this.__identicaService.fetchTweets();
      }, this, 100);
      this.debug("Waiting...")
      this.wait(5000);
    }
  }
})
