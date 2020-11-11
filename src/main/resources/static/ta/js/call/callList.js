import {fnAjaxFragment} from "../common/common.js";


function inputData() {
    var page = 1;
    var size = 10;
    var sort = 'rFileNm.desc';
    let data = {
        page: 1,
        size: 10
    }
    fnAjaxFragment('#dataTableExample_wrapper', data, '/call/retrieveCallList.do');

}

$(document).ready(function () {
    'use strict';
    inputData();

    $(document).off('click').on("click", ".btn-info", function (e) {
        console.log('a >> ', e.target);
        alert("AAAAAAAAAA : " + $(this).attr('data'));
        // });
    });

    // $("#btnSearch").on('click', function () {
    //     validateSearchCondition();
    // });
});