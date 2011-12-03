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
    // ヘッダの隙間空間に書きこむ
    $('header').after('<p>test</p>');
});
