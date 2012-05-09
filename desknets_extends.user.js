// ==UserScript==
// @name           desknet's extends
// @namespace      desknets
// @include        http://fix.me/dnet/*
// ==/UserScript==
(function (doc, func) {
    var head = doc.getElementsByTagName('head')[0];
    var jquery = doc.createElement('script');
    jquery.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    
    var ui = doc.createElement('script');
    ui.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js');
    
    var css = doc.createElement('link');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css');
    css.setAttribute('rel', 'stylesheet');
    
    // JQuery UIのロードの完了イベントにコールバックを登録するメソッド
    var uiEventListener = function () {
        ui.addEventListener('load', function() {
            var script = doc.createElement('script');
            script.textContent = 'jQuery.noConflict();(' + func.toString() + ')(jQuery);';
            head.appendChild(script);
        }, false);
    }
    
    // JQueryのロードの完了イベントにコールバックを登録するメソッド
    var jqueryEventListener = function (){
        jquery.addEventListener('load', function() {
            uiEventListener();
            head.appendChild(ui);
        }, false);    
    }
    // CSSを追加
    head.appendChild(css);
    // JQueryのイベントハンドラ登録した後に追加
    jqueryEventListener();
    head.appendChild(jquery);

})(document, function($) {
    $(function(){
    
        // デバッグ用関数定義
        // var debug = alert;
        var debug = function() {}
        debug('実行');
        
        /*******************************************
         * ユーザー検索をカスタマイズする
         * データが存在しなければ処理しない。
         */
        var customizeSearchResult = function () {
            // 検索結果の行を取得
            var rows = $('body > form > center:eq(0)'
                + ' > table:eq(2) > tbody > tr > td:eq(2)'
                + ' > table > tbody > tr:eq(1) > td:eq(1)'
                + ' > table:eq(3) > tbody > tr > td'
                + ' > table > tbody'
                + ' > tr[bgcolor="#FFFFFF"]'
            );
            
            if(rows.size() == 0) {
                debug('検索結果が存在しないため処理中断');
                return;
            }
            
            rows.each(function() {
                // リンクを取得
                var anchor = $(this).find('td:eq(0) > a:eq(0)');
                
                // IDを取得する
                var url = anchor.attr('href');
                var cutStart = url.indexOf('&id=') + 1;
                var cutEnd = url.indexOf('&', cutStart);
                var userId = url.substring(cutStart, cutEnd);
                
                // スケジュールへのURLを生成
                var targetUrl = 'dnet.cgi?page=schmonth&' + userId;
                debug('sch-url:' + targetUrl);
                
                // 名前の下にスケジュールへのリンクを追加する
                anchor.after('<br><a href="' + targetUrl + '"><font size="1">スケジュール</font></a>');
            });
        };
        
        /*****************************************
         * DDリストをカスタマイズする
         */
        var customizeDDList = function() {
            // 選んでくださいを削除
            $('select[name="hmodule"] > option:contains(選んでください):parent').remove();
            // 利用者名簿をデフォルトに
            $('select[name="hmodule"] > option[value="24"]').attr('selected', 'selected');
        };
        
        //-------------------------------------------
        // 上記で定義した関数を用いてカスタマイズ実施
        customizeSearchResult();
        customizeDDList();
    });
});