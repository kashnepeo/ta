$(function () {
    'use strict';

    function inputData() {
        var page = 1;
        var size = 10;
        var sort = 'rFileNm.desc';
        $.ajax({
            url: "/call/retrieveCallList.do",
            // data: {page: page, size: size, sort: sort},
            type: "POST",
            cache: false
        }).done(function (fragment) {
            $("#dataTableExample_wrapper").replaceWith(fragment);
        });

    }

    inputData();

    $("#btnSearch").on('click', function () {
        validateSearchCondition();
    });
});