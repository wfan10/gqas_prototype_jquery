/**
 * jQuery plugins and plugin related objects
 *
 * Notes on writing jQuery plugins:
 * fn is the prototype for jQuery
 * 'this' within fn always refers to the list of jQuery objects.
 * if you need the DOM object ... then you must loop through using
 * $(elements).each( function( index, element ){ // do stuff wth each DOM element  } )
 * or get the first DOM element by using $(this)[0]
 *
 * Authored by William Fan 2016 
 */
(function($, win, doc) {
  /**
   * implements permanent or session storage.
   * returns: the json parsed object or null
   * Note the difference between jQuery $.data function.
   *  localStorage will store as json string and will be permanent.
   *  $.data will store as javascript reference object and data will be gone when browser document is closed.
   *  localStorage then data will persist the data across sessions.
   *  sessionStorage the data will not persist across browser sessions.
   */
  $.storeData = function(
    type /** required string: localStorage or sessionStorage**/ ,
    key /** required string: the key to set the value **/ ,
    value /** optional ref: object to pass data or nothing to get **/ ) {
    // checks
    if (!type) throw new Error("storeData require type values!");
    if (!key) throw new Error("storeData require key value!");
    //
    value = value ? JSON.stringify(value) : null;
    // if storage is available then use it
    if (win.storageAvailable(type)) {
      // get the storage object.
      var storage = win[type];
      if (value) {
        storage.setItem(key, value);
      }
      return JSON.parse(storage.getItem(key));
    }
    // otherwise use jQuery.data function.
    else {
      if (value) $.data(document, key, value);
      return JSON.parse($.data(document, key));
    }
  };

  /**
   * Bind an event to the handler
   * target /** required string: DOM id string selector ** ,
   * evtType  /** required string: event type string **,
   * delegate /** optional string or undefined for the delegate selector **,
   * function /** required handler object **
   */
  $.bindEvent = function(target, evtType, delegate, handler) {
    if (!target) throw new Error("bindEvent require target parameter!");
    if (!evtType) throw new Error("bindEvent require evtType parameter!");
    if (!handler) throw new Error("bindEvent require a handler parameter!");
    var $target = $(target);
    if (delegate) {
      return $target.on(evtType, delegate, handler);
    } else {
      return $target.on(evtType, handler);
    }
  };

  /**
   * Bind an event to the handler
   * target /** required ref: jquery object ** ,
   * evtType  /** required string: event type string **,
   * delegate /** optional string or undefined for the delegate selector **,
   * function /** required handler object **
   */
  $.refbindEvent = function(target, evtType, delegate, handler) {
    var length = (target.length) ? 1 : 0;
    if (!length) throw new Error("refbindEvent require target parameter as jQuery object!");
    if (!evtType) throw new Error("refbindEvent require evtType parameter!");
    if (!handler) throw new Error("refbindEvent require a handler parameter!");
    if (delegate) {
      return target.on(evtType, delegate, handler);
    } else {
      return target.on(evtType, handler);
    }
  };

  /**
   *  Usage: jqcontainer.isParent( child );
   *  Uses jQuery.has( child.container.get(0) ).length;
   */
  $.fn.isParent = function(child /** required selector or DOM element **/ ) {
    var length = this.has(child).length;
    if (length) return true;
    return false;
  };

  /**
   * Generic utility functions
   * Usage: $.isParentOf( jqcontainer, jqView );
   
  $.isParentOf = function(parent, child) {
    if (parent instanceof JqObject) parent = parent.container;
    if (child instanceof JqObject) child = child.container.get(0);
    return parent.isParent(child);
  };
  */

  /*
   * postMsg is identical to $element.trigger( evtType, data ).
   * Difference is that data is required to use postMsg.
   * evtType can be namespaced as in gqas.ajaxdata ... 
   
  $.fn.postMsg = function(evtType, data) {
    if (!evtType) throw new Error("postMsg require evtType!");
    if (!data) throw new Error("postMsg require data!");
    // if (! $.isPlainObject( data ) ) throw new Error("postMsg data is not plain object!");
    // trigger is jQuery function ... so we are triggering event on the LIST of jQuery objects
    return this.trigger(evtType, data);
  };

  /**
    * This plugin mimics Windows.postMsg messages.
    * triggers an event of type 'eventType' on the target
    * usage: $.postMsg( jqdata, 'ajax.myapp', { url: ... and so on  } );
    
   $.postMsg = function(
     target /** required ref: jQuery object ** ,
     eventType /** required string: event type string **,
     data /** required ref plain Array or obj i.e. $.isPlainObject(obj) is true ** ) {
     return target.postMsg(eventType, data);
   };

  /**
   * Returns a data handler function object.
   * Note this means that the onMsg handler must have parameters event, data as below. 
   * $('#anyDiv').onMsg('filterClick', 'selector', function(e,data){ // function body });
   *
  $.fn.dataHandler = function(evtType, handler) {
    var $this = $(this)[0];
    return function(event, data) {
      $.data($this, evtType + '.msg', data);
      if (handler) handler.apply($this, arguments);
    };
  };

  /**
   * onMsg implements jQuery.on function. 
   *
  $.fn.onMsg = function(evtType, selector, handler) {
    if (!evtType) throw new Error("onMsg require evtType!");
    // patch around the handler parameter
    handler = this.dataHandler(evtType, handler);
    // attach the handler to each container.
    return this.on(evtType, selector, handler);
  };

  /**
   * dropMsg is identical to $element.off( evtType, selector, handler  )
   *
  $.fn.dropMsg = function(evtType, selector) {
    if (!evtType) throw new Error("dropMsg require evtType!");
    _selector = selector ? selector : null;
    return this.off(evtType, _selector);
  };


  /**
   * cacheData is the same as $.data
   * note the use of $this for the DOM element and not jQuery object.
   */
  $.fn.cacheData = function(key, value) {
    // we only do this on the first DOM element...not the list of jQuery elements
    var $this = $(this)[0];
    return $.data($this, key, value);
  };

  /**
   * remove data from any element
   **/
  $.fn.cacheRemove = function(key) {
    // we only do this on the first DOM element.
    var $this = $(this)[0];
    return $.removeData($this, key);
  };

  /**
   * query element to see if there are cached items.
   * returns: how many items or 0 if none.
   */
  $.fn.hasData = function() {
    var $this = $(this)[0];
    // get the jQuery object from the cache
    var cdata = $.data($this);
    var props = win.objProps(cdata);
    return props.length;
  };

  /**
   * query element to see if there is data associated with key
   * returns how many items or 0 if none.
   */
  $.fn.hasDataKey = function(key) {
    var $this = $(this)[0];
    // get the jQuery object from the cache
    var cdata = $.data($this, key);
    var props = win.objProps(cdata);
    return props.length;
  };

  /**
   * Generic ajax object which holds ajax settings information.
   * Usage:
   * ajaxobj.settings.data = dataToPass;
   * ajaxobj.settings.success = function (data) { do stuff with data }
   * var jqxhr = $.ajax( ajaxobj.settings );
   */
  var AjaxObj = {
    init: function(element, method, baseurl, settings) {
      // set the base url property
      this.baseurl = baseurl;
      // settings other than url, context. can be null
      this.settings = $.extend({}, $.fn.ajaxConfig.settings, settings);
      // context for any callback is the DOM element.
      this.settings.context = element;
      // tack on 'method' to settings
      this.settings.method = method;
    }
  };

  /*
   * ajaxConfig is configuration for the ajax parameters object. 
   * This is very similar to ajaxSetup function. 
   * Note the context 'this' is the DOM element that this function call is intiated from. 
   * 'this' in all ajax handler calls is '#element'. 
   * Usage: $('#element').ajaxConfig( 'ajax1','GET' ); 
   */
  // attach ajax object to ANY jQuery element
  $.fn.ajaxConfig = function(
    name /** required name of ajax config object **/ ,
    method /** required string: POST / GET / others? **/ ,
    baseurl /** required string for url base i.e. http://localhost:8081/9000 **/ ,
    settings /** optional ref: extend default settings or null **/
  ) {
    // each element gets a cached object
    if (!name) throw new Error("ajaxconfig requires a name!");
    if (!method) throw new Error("ajaxconfig require a method!");
    if (!baseurl) throw new Error("ajaxconfig require a url base!");
    // element refers to the DOM element.
    var element = $(this)[0];
    // remove any existing 
    $.removeData(element, name);
    // create a new instance and initialize the object
    ajaxobj = Object.create(AjaxObj);
    ajaxobj.init(element, method, baseurl, settings);
    // cache the ajax config to the element..
    $.data(element, name, ajaxobj);
  };

  // set default options settings object to attachAjax. Note we are turning off glabal events.
  $.fn.ajaxConfig.settings = {
    // we do not want ajax global events. 
    global: false,
    // data is always json. 
    dataType: 'json'
  };

  // General element println to output string to any element.
  // usage: $(myelem).println( "hello ", myName );
  $.fn.println = function() {
    // join all arguments into 1 string
    var msg = Array.prototype.join.call(arguments, " ");
    // loop through all jQuery objects to append message
    this.each(function(i, elem) {
      // append a text node
      $(elem).append(document.createTextNode(msg)).append("<br/>");
    });
    // return for chaining
    return this;
  };

  // for printing debug messages to the browser.
  $.debugPrintLn = function() {
    var element = $("#debug");
    if (element.length === 0) {
      element = $("<div id='debug'><h2>Debug Output</h2></div>");
      element.prependTo($(document.body));
    }
    element.println.apply(element, arguments);
  };

  /**
   * Logger object: Can be used to log messages associated with the element.
   * attachLogger creates a logger object and cache the object to the element
  
  var Logger = {
    init: function(options, elem) {
      // elem refers to the DOM element
      this.elem = elem;
      // set the options
      this.options = options;
      // log of messages
      this.messages = [];
    },
    attachMsg: function(msg) {
      this.messages.push(JSON.stringify(msg));
    },
    resetMsgs: function() {
      this.messages = [];
    },
    display: function() {
      var self = this;
      var msg = 'log contents of ' + this.elem + ';id=' + $(this.elem).attr("id");
      if (this.options.println) $.debugPrintLn(msg);
      else console.log(msg);
      $.each(this.messages, function(i, obj) {
        var msg = i + ': ' + obj;
        if (self.options.println) $.debugPrintLn(msg);
        else console.log(msg);
      });
    }
  };

  // attach logger to each jQuery element
  $.fn.attachLogger = function(options) {
    // each element gets a cached data object
    // $elements refers to the list of jQuery objects
    var $elements = this;
    return $elements.each(function() {
      // 'this' from .each function refers to each DOM element ( NOT jQuery object )
      // create an instance of logger object
      var logger = Object.create(Logger);
      // extend options from default
      options = $.extend({}, $.fn.attachLogger.options, options);
      // init the logger
      logger.init(options, this);
      // cache the logger object to the element..
      $.data(this, options.name, logger);
    });
  };

  /**
   * default options settings. name is the name given to $.data
   * println option sets how the messages can be shown.
   
  $.fn.attachLogger.options = {
    // add all options for logger object here
    name: 'logger',
    println: false
  };
  // Create a event handler logging function for this element
  $.fn.eventLogger = function(
    logger /** ref object or null ** ,
    evtType /** string: eventType ** ,
    handler /** ref event handler** ) {
    // if there is no logger then just return the handler function.
    if (!logger) return handler;
    // Return a function that logs the passed message argument followed by all postMsged values.
    var $this = $(this)[0];
    return function(evt) {
      var values = [];
      // add the message first.
      values.push(evtType);
      // event information
      values.push(evt);
      // push array of all but the first argument.
      values.push([].slice.call(arguments, 1));
      // attach the information
      logger.attachMsg(values);
      // execute the handler: note the conext object is the DOM element.
      if (handler) handler.apply($this, arguments);
    };
  };
  **/

  /**
   * Cache the event information into the element.

  $.fn.eventHandler = function(
    evtType,
    handler) {
    // Return a function that cache the event object.
    var element = $(this)[0];
    return function(evt) {
      // split the event type ... might be more than 1 event type in list such as 'click change'
     //     var re = /\s* ;
      var typeList = evtType.split(re);
      // cache the event information.
      $.each(typeList, function(index, type) {
        $.data(element, 'childEvent.' + type, evt);
      });
      // execute the handler: note the context object is the DOM element.
      if (handler) handler.apply(element, arguments);
    };
  };
     **/
})(jQuery, window, document);