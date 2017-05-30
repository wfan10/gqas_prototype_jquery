(function($, win) {
  /*
   * Create window application constructors and objects here. 
   * 
   */
  // store permanent objects into localStorage. 
  var myMap = {
    "1": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 2,
      "oper_desc": "> (Greater Than)",
      "sql_oper": ">"
    }, {
      "oper_id": 3,
      "oper_desc": "< (Less Than)",
      "sql_oper": "<"
    }, {
      "oper_id": 4,
      "oper_desc": ">= (Grtr or Eql)",
      "sql_oper": ">="
    }, {
      "oper_id": 5,
      "oper_desc": "<= (Less or Eql)",
      "sql_oper": "<="
    }, {
      "oper_id": 6,
      "oper_desc": "<> (Not Equal)",
      "sql_oper": "<>"
    }, {
      "oper_id": 7,
      "oper_desc": "Between",
      "sql_oper": "Between"
    }],
    "2": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 6,
      "oper_desc": "<> (Not Equal)",
      "sql_oper": "<>"
    }],
    "3": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 6,
      "oper_desc": "<> (Not Equal)",
      "sql_oper": "<>"
    }, {
      "oper_id": 7,
      "oper_desc": "Between",
      "sql_oper": "Between"
    }],
    "4": [{
      "oper_id": 5,
      "oper_desc": "<= (Less or Eql)",
      "sql_oper": "<="
    }, {
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }],
    "5": [{
      "oper_id": 9,
      "oper_desc": "Has",
      "sql_oper": "HAS"
    }],
    "6": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }],
    "7": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 6,
      "oper_desc": "<> (Not Equal)",
      "sql_oper": "<>"
    }, {
      "oper_id": 7,
      "oper_desc": "Between",
      "sql_oper": "Between"
    }],
    "8": [{
      "oper_id": 8,
      "oper_desc": "Like",
      "sql_oper": "Like"
    }, {
      "oper_id": 10,
      "oper_desc": "Not Like",
      "sql_oper": "Not Like"
    }],
    "9": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 2,
      "oper_desc": "> (Greater Than)",
      "sql_oper": ">"
    }, {
      "oper_id": 3,
      "oper_desc": "< (Less Than)",
      "sql_oper": "<"
    }, {
      "oper_id": 4,
      "oper_desc": ">= (Grtr or Eql)",
      "sql_oper": ">="
    }, {
      "oper_id": 5,
      "oper_desc": "<= (Less or Eql)",
      "sql_oper": "<="
    }, {
      "oper_id": 6,
      "oper_desc": "<> (Not Equal)",
      "sql_oper": "<>"
    }, {
      "oper_id": 7,
      "oper_desc": "Between",
      "sql_oper": "Between"
    }, {
      "oper_id": 11,
      "oper_desc": "Is Null",
      "sql_oper": "IS NULL"
    }, {
      "oper_id": 12,
      "oper_desc": "Is Not Null",
      "sql_oper": "IS NOT NULL"
    }],
    "10": [{
      "oper_id": 13,
      "oper_desc": "<= (Less or Eql)",
      "sql_oper": "<="
    }],
    "11": [{
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 2,
      "oper_desc": "> (Greater Than)",
      "sql_oper": ">"
    }, {
      "oper_id": 3,
      "oper_desc": "< (Less Than)",
      "sql_oper": "<"
    }, {
      "oper_id": 4,
      "oper_desc": ">= (Grtr or Eql)",
      "sql_oper": ">="
    }, {
      "oper_id": 5,
      "oper_desc": "<= (Less or Eql)",
      "sql_oper": "<="
    }, {
      "oper_id": 6,
      "oper_desc": "<> (Not Equal)",
      "sql_oper": "<>"
    }],
    "12": [{
      "oper_id": 5,
      "oper_desc": "<= (Less or Eql)",
      "sql_oper": "<="
    }, {
      "oper_id": 1,
      "oper_desc": "= (Equals)",
      "sql_oper": "="
    }, {
      "oper_id": 7,
      "oper_desc": "Between",
      "sql_oper": "Between"
    }]
  };

  //win.localStorage.setItem("gqas.operators", JSON.stringify(myMap));
  $.storeData('localStorage', 'gqas.operators', myMap);
  // create the main application objects
  win.gqasApp = new win.JqData($('#main-content'));
  win.jqOptions = new win.JqObject($('#myModal'));
  win.jqFltrList = new win.JqObject($('#fltrlist'));
  win.jqFltrValue = new win.JqObject($('#fltrValue'));
  // create global variables and initialize. 
  gqasApp.filterVar = {};
  // retrieve the operator map from localStorage. 
  var opermap = $.storeData('localStorage', 'gqas.operators');
  // compile underscore template  
  jqOptions.templateCompile('operTemplate', $("script.opertemplate").html());
  // get the operator list based on operator group. 
  jqOptions.getOperators = function(operGrp, jqULSelector) {
    if (!operGrp) throw new Error("getOperators requires an operator group value!");
    var length = ($(jqULSelector).length === 1) ? 1 : 0;
    if (!length) throw new Error("getOperators requires a jQuery container selector.");
    // 
    var operList = opermap[operGrp];
    var operData = { operators: operList };
    // console.log('operData is ' + operData);
    var htmlFrag = this.templateExecute('operTemplate', operData);
    // clear the list first 
    this.appendFrag(jqULSelector, htmlFrag);
  }; // getOperators
  // compile the options list based on the options string. 
  jqOptions.templateCompile('optionTemplate', $("script.optiontemplate").html());
  // 
  jqOptions.getOptions = function(options, jqOptSelector) {
    if (!options) throw new Error("getOptions requires options value!");
    var length = ($(jqOptSelector).length === 1) ? 1 : 0;
    if (!length) throw new Error("getOptions requires a List Options container selector.");
    //console.log( 'getOptions is called with options as ' + options );
    var optList = [];
    var opt = {};
    var vgCount = 0;

    // almost every filter has 'T'
    if (options.indexOf('T') >= 0) {
      // push the item to array. 
      opt = {
        "optId": "T",
        "optDesc": "(T)Type In"
      };

      optList.unshift(opt);
    }

    if (options.indexOf('G') >= 0) {
      // push the item to the array. 
      opt = {
        "optId": "G",
        "optDesc": "(G)Groups Only"
      };

      optList.unshift(opt);
      vgCount++;
    }

    if (options.indexOf('V') >= 0) {
      // push the item to the array. 
      opt = {
        "optId": "V",
        "optDesc": "(V)Values Only"
      };

      optList.unshift(opt);
      vgCount++;
    }

    // check the length ... if 2 then give VG option
    if (vgCount > 1) {
      opt = {
        "optId": "VG",
        "optDesc": "(VG)Values Groups"
      };
      // add to the front of the array. 
      optList.unshift(opt);
    }

    var info = 'getOptions optList length is ' + optList.length + '; optId items are ';
    for (var i = 0; i < optList.length; i++) {
      info += optList[i]['optId'] + ';';
    }

    var htmlFrag = this.templateExecute('optionTemplate', { options: optList });
    // append the html fragment to the selector
    this.appendFrag(jqOptSelector, htmlFrag);
  }; // end getOptions 

  // myModal functions and binds. 
  jqOptions.selectors.myModal = '#myModal';
  jqOptions.selectors.optSave = '#optSave';

  $.bindEvent(jqOptions.selectors.myModal, 'show.bs.modal', undefined, function() {
    console.log('myModal show.bs.modal event fired.');
    jqOptions.getOperators(gqasApp.filterVar.opergrp, '#lbOper');
    jqOptions.getOptions(gqasApp.filterVar.options, '#lbOpt');
  });

  function listDefaults() {
    console.log('myModal shown.bs.modal event fired.');
    // select the operator default item and set the following text input element also. 
    var $item = $('#lbOper li:eq(0)');
    $item.trigger('click');
    // select the default option list item and set the text input value. 
    var optDefault = gqasApp.filterVar.optdefault;
    var optLength = optDefault.length;
    // find the li value in the string ( VG+ stripped of + sign to VG )
    optDefault = optDefault.indexOf('+') < 0 ? optDefault : optDefault.substr(0, optLength - 1);
    console.log('myModal shown.bs.modal used optDefault ' + optDefault);
    var $item2 = $('#lbOpt').find('li[id="' + optDefault + '"]');
    // same as $item2 != null 
    if ($item2) {
      $item2.trigger('click');
      console.log('lbOpt li item found.');
    } else {
      $('#lbOpt li:eq(0)').trigger('click');
      console.log('lbOpt li item not found. Default to first value');
    }
    // 
    var $control = $('#lbValid').parent('.dropdown').find('.dropdown-toggle');
    var $item3;
    if (gqasApp.filterVar.optdefault.indexOf('+') < 0) {
      // select the first li item. 
      $item3 = $('#lbValid li:eq(0)');
      // set the text input value. 
      $item3.trigger('click');
      // disable the list 
      $control.addClass('disabled');
    } else {
      // enable selector
      $control.removeClass('disabled');
      // select "Valid Rows Only" and set the text input value. 
      $item3 = $('#lbValid li:eq(1)');
      //$item.addClass('selected');
      $item3.trigger('click');
    }
  }
  // set default values 
  $.bindEvent(jqOptions.selectors.myModal, 'shown.bs.modal', undefined, listDefaults);

  $.bindEvent(jqOptions.selectors.optSave, 'click', undefined, function() {
    // trigger a global event
    // lbOperTxt;lbOptTxt;lbValidTxt
    var operTxtVal = $('#lbOperTxt').attr('idVal');
    var optTxtVal = $('#lbOptTxt').attr('idVal');
    var validTxtVal = $('#lbValidTxt').attr('idVal');

    var optionsVal = undefined;
    gqasApp.filterVar.optionsVal = undefined;
    // ( optTxtVal.indexOf('T') >= 0 )  ? optTxtVal:undefined;
    switch (optTxtVal) {
      case 'VG':
        optionsVal = 'VG';
        break;
      case 'V':
        optionsVal = 'V';
        break;
      case 'G':
        optionsVal = 'G';
        break;
      default:
        console.log('#optSave switch optTxtVal should be T: ' + optTxtVal);
    }

    if (optionsVal) {
      // add the valid rows option if indicated. 
      optionsVal = validTxtVal.indexOf('+') < 0 ? optionsVal : optionsVal += '+';
      // save into global data  
      gqasApp.filterVar.optionsVal = optionsVal;
      console.log('#optSave optionsVal used is ' + gqasApp.filterVar.optionsVal);
      // trigger the application event. 
      gqasApp.container.triggerHandler('gqas.filter.select');
    }
    // disable the add button
    $("#btnVAdd").prop("disabled", true);
    $("#btnVAdd").removeClass("btn-primary");
  });


  // create filters list table.  
  var createTable1 = function() {

    var columnsArray = [{
      data: 'groupId'
    }, {
      data: 'filterOptionDflt'
    }, {
      data: 'filterDesc'
    }, {
      data: 'groupName'
    }, {
      data: 'filterOptionList'
    }, {
      data: 'filterPointer'
    }, {
      data: 'operGrpId'
    }, {
      data: 'filterId'
    }, {
      data: 'filterLoaded'
    }, {
      data: 'filterUse'
    }, {
      data: 'filterColType'
    }, {
      data: 'filterSingleSel'
    }, {
      data: 'filterQasCol1'
    }, {
      data: 'filterQasCol2'
    }, {
      data: 'filterQasCol3'
    }, {
      data: 'filterQasCol4'
    }, {
      data: 'filterQasCol5'
    }];

    var dtable = $('#tblFltrSelect').DataTable({
      "columns": columnsArray,
      "searching": false,
      "paging": false,
      "scrollY": "460px",
      "scrollCollapse": true,
      "select": "single",
      "ordering": false,
      /*
      ,
      "columnDefs": [{
        "targets": [1, 2],
        "orderable": false
      }]
      
      ,
      "order": [
        [0, 'asc']
      ]
      */
      "createdRow": function(row, data, dataIndex) {
        $(row).addClass('toggle');
        $(row).attr('groupid', data.groupId);
        $(row).attr('filterid', data.filterId);
        $(row).attr('options', data.filterOptionList);
        $(row).attr('opergrp', data.operGrpId);
        $(row).attr('optdefault', data.filterOptionDflt);
        //
        var qasNumEl = 0;
        //var qasCol = [];
        var qasCol = '';

        if (data.filterQasCol1 != 'null') {
          qasNumEl = qasNumEl + 1;
          //qasCol.push( data.filterQasCol1 );
          qasCol += data.filterQasCol1;
        };
        if (data.filterQasCol2 != 'null') {
          qasNumEl = qasNumEl + 1;
          //qasCol.push( data.filterQasCol2 );
          qasCol += ';' + data.filterQasCol2;
        };
        if (data.filterQasCol3 != 'null') {
          qasNumEl = qasNumEl + 1;
          //qasCol.push( data.filterQasCol3 );
          qasCol += ';' + data.filterQasCol3;
        }
        if (data.filterQasCol4 != 'null') {
          qasNumEl = qasNumEl + 1;
          //qasCol.push( data.filterQasCol4 );
          qasCol += ';' + data.filterQasCol4;
        }
        if (data.filterQasCol5 != 'null') {
          qasNumEl = qasNumEl + 1;
          //qasCol.push( data.filterQasCol5 );
          qasCol += ';' + data.filterQasCol5;
        }
        // numcol attribute is the column index to show in table2.  
        $(row).attr('numcol', qasNumEl);
        $(row).attr('qascol', qasCol);
        // for this table only show 3 columns
        $(row).find('td').each(
          function(indx, el) {
            if (indx >= 3) $(this).addClass('hidden');
          }
        ); // end each
      }, // end createdRow
      //
      "drawCallback": function(settings) {
          // get the api. 
          var api = this.api();
          // get all DOM 'tr' nodes.
          var rows = api.rows({
            page: 'all'
          }).nodes();
          // flag for each group
          var last = null;
          // collect all values from column 3. insert new row when group changes value
          api.column(3, {
              page: 'all'
            })
            .data()
            .each(function(group, i) {
                // if the group id changes value then add a additional group header row before the row.  
                if (last !== group) {
                  $(rows).eq(i).before(
                    '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                  );
                  last = group;
                }
              } // end .each
            );
        } // end drawCallback
    }); // end datatable

    return dtable;
  }

  jqFltrList.table1 = createTable1();

  jqFltrList.selectors.tbody = '#tblFltrSelect tbody';
  jqFltrList.selectors.trtoggle = '#tblFltrSelect tr.toggle';
  jqFltrList.selectors.btnopt = '#btnOpt';
  // var selector = jqFltrList.selector['tbody'];
  $.bindEvent(jqFltrList.selectors.tbody, 'click', 'tr.group', function() {
    // hide all siblings with class 'tr.toggle
    var thisGroup = $(this).next("tr.toggle").nextUntil("tr.group");
    thisGroup.toggle();
    // deselect all rows. 
    jqFltrList.table1.rows().deselect();
  });

  /**
  $('#tblFltrSelect tbody').on('click', 'tr.toggle', function () {
    gqasApp.filterVar.filterId = $(this).attr('filterid');
    gqasApp.filterVar.options = $(this).attr('options');
    gqasApp.filterVar.opergrp = $(this).attr('opergrp');
    gqasApp.filterVar.numcol = $(this).attr('numcol');
    gqasApp.filterVar.qascol = $(this).attr('qascol');
    gqasApp.filterVar.optdefault = $(this).attr('optdefault');
  }); // on click
  **/
  // capture data from the tr.toggle row. 
  $.bindEvent(jqFltrList.selectors.tbody, 'click', 'tr.toggle', function() {
    gqasApp.filterVar.filterId = $(this).attr('filterid');
    gqasApp.filterVar.options = $(this).attr('options');
    gqasApp.filterVar.opergrp = $(this).attr('opergrp');
    gqasApp.filterVar.numcol = $(this).attr('numcol');
    gqasApp.filterVar.qascol = $(this).attr('qascol');
    gqasApp.filterVar.optdefault = $(this).attr('optdefault');
  });

  // if table1 rows are selected. 
  jqFltrList.table1.on('select', function(e, dt, type, indexes) {
    $(jqFltrList.selectors.btnopt).prop("disabled", false);
    $(jqFltrList.selectors.btnopt).addClass("btn-primary");
  });

  // trying this ... should work. 
  /*
  jqFltrList.refbindEvent( jqFltrList.table1, 'select', undefined, function () {
    $(jqFltrList.selectors.btnopt).prop("disabled", false);
    $(jqFltrList.selectors.btnopt).addClass("btn-primary");
  });
  */

  // if table1 rows are deselected. 
  jqFltrList.table1.on('deselect', function(e, dt, type, indexes) {
    $("#btnOpt").prop("disabled", true);
    $("#btnOpt").removeClass("btn-primary");
  });

  /*
  jqFltrList.refbindEvent(jqFltrList.table1, 'deselect', undefined, function () {
    $(jqFltrList.selectors.btnopt).prop("disabled", true);
    $(jqFltrList.selectors.btnopt).removeClass("btn-primary");
  });
  */
  // execute function after modal dialog is called
  /**
  $('#myModal').on('show.bs.modal', function (e) {
    console.log('myModal show.bs.modal event fired.');
    jqOptions.getOperators(gqasApp.filterVar.opergrp, '#lbOper');
    jqOptions.getOptions(gqasApp.filterVar.options, '#lbOpt');
  });
  **/
  //jqFltrList.container.on("gqas.filterlist.ready", function () {
  $.refbindEvent(jqFltrList.container, 'gqas.filterlist.ready', undefined, function() {
    console.log("Event gqas.filterlist.ready fired.");
    var data = gqasApp.cacheData('items');
    // jqFltrList.table1.rows.add(gqasApp.items).draw();
    jqFltrList.table1.rows.add(data).draw();
    // deselect all rows. 
    jqFltrList.table1.rows().deselect();
    // $("#tblFltrSelect tr.toggle").hide();
    $(jqFltrList.selectors.trtoggle).hide();
  });


  // create filter values table. 
  var createTable2 = function() {

    var fltrVCol = [{
      data: 'fdesc'
    }, {
      data: 'valCol1'
    }, {
      data: 'valCol2'
    }, {
      data: 'valCol3'
    }, {
      data: 'valCol4'
    }, {
      data: 'valCol5'
    }, {
      data: 'groupId'
    }, {
      data: 'groupOwner'
    }, {
      data: 'groupName'
    }];

    var dtable = $('#tblFltrValues').DataTable({
      "columns": fltrVCol,
      "paging": false,
      "scrollY": "400px",
      "scrollCollapse": true,
      "ordering": false
        /*
        , "createdRow": function(row, data, dataIndex) {
            $(row).find('td').each(
              function(indx, el) {
                if (indx >= 6) $(this).addClass('hidden');
              }
            ); // end each
          } // end createdRow function
        */
    }); // end table2

    return dtable;
  }

  jqFltrValue.table2 = createTable2();

  // fill second table when list is ready
  $.refbindEvent(jqFltrValue.container, 'gqas.filtervalues.ready', undefined, function() {

    console.log("Event gqas.filtervalues.ready fired.");
    jqFltrValue.table2.clear();
    // jqFltrValue.table2.rows.add(gqasApp.fltrValues);
    var data = gqasApp.cacheData('fvalues');
    jqFltrValue.table2.rows.add(data);
    jqFltrValue.table2.draw();

    var numCol = gqasApp.filterVar.numcol;
    numCol++;
    console.log("gqas.filtervalues.ready variable numCol is " + numCol);

    var qasCol = gqasApp.filterVar.qascol.split(';');
    console.log("gqas.filtervalues.ready variable qasCol is  " + qasCol);

    for (i = 0; i < 9; i++) {

      if (i < numCol) {
        jqFltrValue.table2.column(i).visible(true, false);
        if (i > 0) {
          $(jqFltrValue.table2.column(i).header()).text(qasCol.shift());
        }
      } else {
        jqFltrValue.table2.column(i).visible(false, false);
      }
    }

    jqFltrValue.table2.columns.adjust().draw(false);

  });

})(jQuery, window);