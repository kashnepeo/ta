//import {fnAjaxFragment} from "../common/common.js";
//
//
// function inputData() {
//     var page = 1;
//     var size = 10;
//     var sort = 'rFileNm.desc';
//     let data = {
//         page: 1,
//         size: 10
//     }
//     fnAjaxFragment('#dataTableExample_wrapper', data, '/call/retrieveCallList.do');
//
// }

/** 검색 조건 초기화 **/
function reset() {

    $('#search_form').trigger("reset");

    function zeroAppend(num) {
        if (num > 9) {
            return num;
        } else {
            return '0' + num;
        }
    }

    /** 초기화 시 datepicker 값을 설정 **/
    let endDate = new Date();
    let startDate = new Date(Date.parse(endDate) - (30 * 24 * 60 * 60 * 1000));
    $('#startDate > input').val(startDate.getFullYear() + "-" + zeroAppend(startDate.getMonth() + 1) + "-" + zeroAppend(startDate.getDate()));
    $('#endDate > input').val(endDate.getFullYear() + "-" + zeroAppend(endDate.getMonth() + 1) + "-" + zeroAppend(endDate.getDate()));

    let _option = {
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 0,
        minViewMode: 0,
    };
    $('#startDate').datepicker(_option);
    $('#endDate').datepicker(_option);

}

/** call list 검색 조건으로 조회 **/
function search(){

    var dateType = $("#dateType").val();
    var startDate = $("#startDate > input").val();
    var endDate = $("#endDate > input").val();
    var centerType = $("#centerType").val();
    var timeType = $("#timeType").val();
    var durationType = $("#durationType").val();
    var searchword = $("#searchword").val();

    //console.log("dateType: "+ dateType);
    //startDate = "2020-05-23";
    //endDate = "2020-05-24";

    var extrasearch = {
        "datetype" : dateType,
        "startDate" : startDate,
        "endDate" : endDate,
        "centerType" : centerType,
        "timeType" : timeType,
        "durationType" : durationType,
        "searchword" : searchword,
    }

    var dataTable = $('#dataTableCallList');

    var table = dataTable.DataTable({
        destroy: true,
        processing: true,
        serverSide: true,
        aLengthMenu: [
            [10, 20, 50],
            [10, 20, 50]
        ],
        iDisplayLength: 10,
        language: {
            search: "",
            emptyTable: "데이터가 없습니다",
            info: "_START_~_END_개(전체 _TOTAL_개 중) 항목 표시",
            infoEmpty: "0~0개(전체 0개 중) 항목 표시",
            lengthMenu: "_MENU_ 개씩 보기",
            processing: "처리중...",
            paginate: {
                next: "다음",
                previous: "이전"
            },
        },

        ajax: {
            url: "/callRest/retrieveCallList.do",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: function (d) {
                /** 조회 조건 form 데이터를 extrasearch에 추가 **/
                d.extrasearch = extrasearch;
                //console.log(JSON.stringify(d));
                return JSON.stringify(d);
            }
        },
        columns: [
            {data: null, title: "번호", width: "5%",},
            {data: "rfileNm", title: "콜 아이디", width: "20%"},
            {data: "rusrId", title: "상담원 아이디", width: "20%"},
            {data: "rusrNm", title: "상담원 이름", width: "20%"},
            {data: "yyyymmdd", title: "상담일", width: "20%"},
            {data: null, title: "이벤트 발생", width: "8%",},
        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
            },
            {
                targets: -1,
                searchable: false,
                orderable: false,
                data: null,
                defaultContent: "<button class=\"btn btn-info\" id=\"click\" type=\"button\">상세보기</button>"
            }
        ]
    });

    /** index 번호 계산 **/
    table.on( 'draw.dt', function () {
        var PageInfo = $('#dataTableCallList').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );

    //$('#dataTableCallList tbody').on( 'click', '#click', function () {
    $("#dataTableCallList tbody").off('click').on( 'click', '#click', function (e) {
        var data = table.row( $(this).parents('tr') ).data();
        window.open("/chat/viewChatList.do?rfileNm="+data.rfileNm, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=1400,height=1400");
    });


    dataTable.each(function() {
        var datatable = $(this);
        // SEARCH - Add the placeholder for Search and Turn this into in-line form control
        var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        search_input.attr('placeholder', '검색');
        search_input.removeClass('form-control-sm');
        // LENGTH - Inline-Form control
        var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
        length_sel.removeClass('form-control-sm');
    });
}

$(document).ready(function () {
    'use strict';
    search();
    //inputData();

    $("#btnSearch").on("click", function (e) {
        search();
    });

    $("#btnReset").on("click", function (e) {
        reset();
    });


});
