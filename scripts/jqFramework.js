 /**
  * Implement framework classes in this file.
  * Implement jQuery plugins and javascript utilities in other designated files
  * These classes use jQuery and jqPlugin.js functions
  * Always create instance from these objects. Please add properties to your instance.
  * Please do not change base classes to implement instance behavior. 
  * Instead create your own javascript library and inherit from the prototypes if necessary. 
  */
 /**
  * JqObject is base class to wrap any DOM element to implement jQuery utility functions.
  *
  * This class is meant to implement basic HTMl objects without much fuss.
  * Note that an id attribute is generated if none exist.
  */
 (function($, win) {

   // global settings here 

   /*
    * Note win.counter() is implemented in utility.js. 
    */
   // set a static counter to class constructor
   JqObject.counter = win.counter();
   // constructor function
   function JqObject(container) {
     var length = (container.length === 1) ? container.length : 0;
     if (!length) throw new Error("JqObject container object is invalid!");
     // assume the container is already in place in html document
     this.container = container;
     // check for id attribute ... generate one if necessary.
     this.idVal = this.container.attr("id");
     if (!this.idVal) {
       throw new Error("JqObject requires an id attribute!");
     }
     // increment the counter
     JqObject.counter.count();
     // add class attribute name 'jqobject'. 
     this.container.addClass('jqobject');
     // create a map of child selectors
     this.selectors = {};
     // cache object to the DOM container
     this.container.cacheData('thisObj', this);
   }

   // set the constructor property. Otherwise the JqData constructor would be Object.
   JqObject.prototype.constructor = JqObject;

   /**
    * compile an underscore template 
    * Note function sets and returns an underscore template function property. 
    */
   JqObject.prototype.templateCompile = function(templateProp, templateStr) {
     if (!templateProp) throw new Error("templateCompile requires templateProp parameter!");
     if (!templateStr) throw new Error("templateCompile requires templateStr parameter!");
     // _.templateSettings.variable = "rc" is sets the underscore innter global reference variable. 
     // If we pass object { operators: operData } then the underscore internal reference becomes rc = { operators: operData }  
     _.templateSettings.variable = "rc";
     // compile template
     var tmplFct = _.template(templateStr);
     this[templateProp] = tmplFct;
     return tmplFct;
   };

   /** 
    * Execute an underscore template function
    * Returns a html fragment 
    **/
   JqObject.prototype.templateExecute = function(templateProp, tmpldata) {
     if (!templateProp) throw new Error("templateExecute requires templateProp parameter!");
     if (!$.isPlainObject(tmpldata)) throw new Error("templateExecute requres plain object data!");
     var tmplFct = this[templateProp];
     if (!tmplFct) throw new Error("templateExecute did not find compiled template function!");
     return tmplFct(tmpldata);
   };

   /**
    * Appends a html fragment to selector string parameter
    */
   JqObject.prototype.appendFrag = function(jqSelector, htmlFrag) {
     var $jqSelector = $(jqSelector);
     var length = ($jqSelector.length === 1) ? 1 : 0;
     if (!length) throw new Error("appendFrag jqSelector is invalid!");
     // clear the object first before we append. 
     $jqSelector.empty();
     $jqSelector.append(htmlFrag);
   };

   /*
    * Usaage: var newobj = new JqObject(); newobj.attach(config);
    * Attach any external object so its properties and methods 'this' reference is JqObject instance. 
    */
   JqObject.prototype.attach = function(config) {
     $.extend(this, config);
   };
   // set a window reference to JqObject constructor.
   win.JqObject = JqObject;

 })(jQuery, window);

 /**
  * JqData caches data / stores data / fetch ajax
  */
 (function($, win) {
   // JqData constructor function
   function JqData(container /** ref: jQuery object **/ ) {
     // super constructor
     JqObject.call(this, container);
   }
   // create a prototype object
   JqData.prototype = Object.create(JqObject.prototype);
   // set the constructor property.
   JqData.prototype.constructor = JqData;
   // attach data to container
   JqData.prototype.cacheData = function(
     key /** required string: key **/ ,
     value /** ref: ANYTHING to pass in to set or nothing to get **/ ) {
     // return $.data( this.containerDOM, key, value);
     return this.container.cacheData(key, value);
   };
   // remove data from container
   JqData.prototype.cacheRemove = function(key /** the key or pass nothing to remove all **/ ) {
     return this.container.cacheRemove(key);
     //return $.removeData( this.containerDOM, key );
   };
   // store data permanently or get the data if value is not supplied
   JqData.prototype.storeData = function(
     key /** key **/ ,
     value /** data to set or get **/ ) {
     var _key = this.idVal + '.' + key;
     return $.storeData('localStorage', _key, value);
   };
   // store or get any data under sessionStorage
   JqData.prototype.sessionData = function(
     key /** key **/ ,
     value /** data to store or get **/ ) {
     var _key = this.idVal + '.' + key;
     return $.storeData('sessionStorage', _key, value);
   };
   // attach ajax object
   JqData.prototype.ajaxConfig = function(name, method, baseurl, settings) {
     // add or replace the ajax object configurations.
     try {
       this.container.ajaxConfig(name, method, baseurl, settings);
       if (!this.container.hasDataKey(name)) throw new Error("attachAjax failed on " + name);
       return this.container.cacheData(name);
     } catch (e) {
       //console.log(e);
       console.error('ajaxConfig', e.message);
       return null;
     }
   };
   // execute ajax based on cached ajax configuration object. 
   JqData.prototype.executeAjax = function(name, urlquery, settings) {
     // if (!urlquery) throw new Error('executeAjax require url!');
     if (!this.container.hasDataKey(name)) throw new Error("executeAjax ajaxObj does not exist " + name);
     // the jQuery XMLHttpRequest (jqXHR) object is returned to handle any callbacks. 
     var url = this.container.cacheData(name).baseurl;
     url = (urlquery === undefined) ? url : url + '/' + urlquery;
     // override the default settings with any additional settings. 
     var _settings = $.extend({}, this.container.cacheData(name).settings, settings);
     // var url =  + '/' + urldata;
     console.log('url is ' + url);
     return $.ajax(url, _settings);
   };
   // set a reference to window object.
   win.JqData = JqData;

 })(jQuery, window);