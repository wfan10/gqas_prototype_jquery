(function($) {
  // ajax config 
  var settings = {
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    beforeSend: function(xhr) {
      var token = sessionStorage.getItem("xauth");
      if (token) {
        xhr.setRequestHeader('X-Auth-Token', token);
        console.log("ajax beforeSend used session token " + token);
      } else {
        xhr.setRequestHeader('authorization', 'Basic ' + btoa(
          'wfan10:password2'));
        console.log("ajax beforeSend did not use session token.");
      }
    }
  };

  // set the ajaxConfig object. 
  var ajaxname1 = 'filterlist';
  var baseurl1 = "http://localhost:9000/filterlist";
  gqasApp.ajaxConfig(ajaxname1, 'GET', baseurl1, settings);


  $.refbindEvent(gqasApp.container, 'gqasApp.startup', undefined, function() {
    // retrieve items from stored.   
    var items = $.storeData('localStorage', 'items');
    gqasApp.cacheData('items', items);

    if (_.isEmpty(items)) {
      // do ajax to fetch table1 data'
      var jqXHR = gqasApp.executeAjax(ajaxname1, undefined, undefined);

      jqXHR.done(function(data, textStatus, xhr) {
        console.log('ajax succeeded: response headers ' + xhr.getAllResponseHeaders());
        //  if we get the token in the response ... then save it. 
        var xauth = xhr.getResponseHeader('X-Auth-Token');
        if (xauth) {
          sessionStorage.setItem("xauth", xauth);
        };
        // store and cache the data 
        $.storeData('localStorage', 'items', data);
        $(this).cacheData('items', data);
      });

      jqXHR.fail(function(xhr, textStatus, errorThrown) {
        $(this).cacheData('items', []);
        console.error('ajax failed: error ' + errorThrown.toString());
      });
    }
    // post a DOM event
    jqFltrList.container.triggerHandler("gqas.filterlist.ready");

  });

  // on global event fire callback. 
  // what happens after user clicks on a row in table1
  /*
            var columnsArray = [
        { data: 'groupId' },
        { data: 'filterOptionDflt' },
        { data: 'filterDesc' },
        { data: 'groupName' },
        { data: 'filterOptionList' },
        { data: 'filterPointer' },
        { data: 'operGrpId' },
        { data: 'filterId' },
        { data: 'filterLoaded' },
        { data: 'filterUse' },
        { data: 'filterColType' },
        { data: 'filterSingleSel' },
        { data: 'filterQasCol1' },
        { data: 'filterQasCol2' },
        { data: 'filterQasCol3' },
        { data: 'filterQasCol4' },
        { data: 'filterQasCol5' }
      ];
        $(this).find('td')[7] ... gets the DOM 
        $(filterEl).text() gets the text value. 
  */

  // configure the second ajax function call. 
  var ajaxname2 = 'filtervalues';
  var baseurl2 = "http://localhost:9000/filtervalues";
  gqasApp.ajaxConfig(ajaxname2, 'GET', baseurl2, settings);

  // send the ajax function to get the filter values. 
  // $(document).on('gqas.filter.select', function () {
  $.refbindEvent(gqasApp.container, 'gqas.filter.select', undefined, function() {
    //final url = "http://localhost:9000/filtervalues/" + gqasApp.filterVar.filterId + "?options=" + gqasApp.filterVar.optionsVal;
    var urlquery = gqasApp.filterVar.filterId + "?options=" + gqasApp.filterVar.optionsVal;

    var jqXhr2 = gqasApp.executeAjax(ajaxname2, urlquery, undefined);

    jqXhr2.done(function(data, textStatus, xhr) {
      console.log('ajax succeeded: response headers ' + xhr.getAllResponseHeaders());
      // gqasApp.fltrValues = data;
      gqasApp.cacheData('fvalues', data);
      //  if we get the token in the response ... then save it. 
      var xauth = xhr.getResponseHeader('X-Auth-Token');
      if (xauth) {
        sessionStorage.setItem("xauth", xauth);
      };
      // post a DOM event
      jqFltrValue.container.triggerHandler("gqas.filtervalues.ready");
    });

    jqXhr2.fail(function(xhr, textStatus, errorThrown) {
      var data = [];
      gqasApp.cacheData('fvalues', data);
      console.error('ajax failed: error ' + errorThrown.toString());
    });
  });

  // start up the application. 
  gqasApp.container.triggerHandler('gqasApp.startup');

})(jQuery);