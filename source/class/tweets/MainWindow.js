qx.Class.define("tweets.MainWindow",
  {
    extend: qx.ui.window.Window,

    events: {
      "reload": "qx.event.type.Event",
      "post": "qx.event.type.Data"
    },

    construct: function(){
      this.base(arguments, "tweets", "tweets/logo.png");

      // hide the window buttons
      this.setShowClose(false);
      this.setShowMaximize(false);
      this.setShowMinimize(false);

      this.setContentPadding(0);
      // adjust size
      this.setWidth(250);
      this.setHeight(300);

      // add the layout
      var layout = new qx.ui.layout.Grid(0, 0);
      this.setLayout(layout);

      // toolbar
      var toolbar = new qx.ui.toolbar.ToolBar();
      this.add(toolbar, {row: 0, column: 0, colSpan: 2});

      // reload button
      var reloadButton = new qx.ui.toolbar.Button(this.tr("Reload"));
      reloadButton.setToolTipText(this.tr("Reload the tweets."));

      reloadButton.addListener("execute", function(){
        this.fireEvent("reload");
      }, this);

      toolbar.add(reloadButton);



      // list
      var list = this.__list = new qx.ui.form.List();
      this.add(list, {row: 1, column: 0, colSpan: 2});

      layout.setRowFlex(1, 1);
      layout.setColumnFlex(0, 1);

      // textarea
      var textarea = new qx.ui.form.TextArea();
      textarea.setPlaceholder(this.tr("Enter your message here..."));

      textarea.addListener("input", function(e) {
        var value = e.getData();
        postButton.setEnabled(value.length < 140 && value.length > 0);
      }, this);

      this.add(textarea, {row: 2, column: 0});

      // post button
      var postButton = new qx.ui.form.Button(this.tr("Post"));
      postButton.setToolTipText(this.tr("Post this message on identi.ca"));
      postButton.setWidth(60);
      postButton.setEnabled(false);
      postButton.addListener("execute", function() {
        this.fireDataEvent("post", textarea.getValue());
      }, this);


      this.add(postButton, {row: 2, column: 1});
    },
    members: {
      __list: null,

      getList: function(){
        return this.__list;
      }
    }
  });
