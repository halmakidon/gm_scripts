// ==UserScript==
// @name           ATND Extends
// @namespace      https://github.com/darth-hal
// @description    atndの拡張
// @include        http://atnd.org/*
// ==/UserScript==
(function (d, func) {

  var h = d.getElementsByTagName('head')[0];
  var s1 = d.createElement("script");
  s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
  s1.addEventListener('load', function() {
    var s2 = d.createElement("script");
    s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
    h.appendChild(s2);
  }, false);
  h.appendChild(s1);

})(document, function($) {

  // CONST
  var SEARCH_API = 'http://api.atnd.org/events/';

    // ATND Search Success Action
  function searchSuccess(msg) {
    window.alert(msg);
  }

  // createSearchForm html
  function createForm(beforeEle) {
    var form = $('<form/>');
    var text = $('<input id="gm_query" type="text" />');
    var button = $('<input id="gm_search" type="button" value="検索"/>')
      .click(searchApi);
    form.append(text);
    form.append(button);
    beforeEle.after(form);
  }

  // ATND Ajax Search
  function searchApi() {
    var queryStr = $('#gm_query').val();
    $.ajax({
      async : false,
      type : 'GET',
      timeout : 3000,
      url : SEARCH_API,
      data : 'format=json&keyword=' + queryStr,
      success : function(msg) {
        window.alert(msg);
      }
    });
  }

  // ヘッダの隙間空間に書きこむ
  createForm($('header'));

});
