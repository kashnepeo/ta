$(function ($) {
    function fnAjax() {
        return $.ajax({
            /** var token = $("meta[name='_csrf']").attr("content");
             var header = $("meta[name='_csrf_header']").attr("content"); */
            url: "/common/retrieveCommonCodeList.do",
            type: "POST",
            async: true,
            cache: false
            /** , before: function (xhr) {
                xhr.setRequestHeader(header, token);
        }*/
        });
    }

    function zeroAppend(num) {
        if (num > 9) {
            return num;
        } else {
            return '0' + num;
        }
    }

    async function setCommonCodeList() {
        $("#search_condition").replaceWith(await fnAjax());
        let _option = {
            format: 'yyyy-mm-dd',
            autoclose: true,
            startView: 0,
            minViewMode: 0,
        };
        $('#startDate').datepicker(_option);
        $('#endDate').datepicker(_option);
        let endDate = new Date();
        let startDate = new Date(Date.parse(endDate) - (30 * 24 * 60 * 60 * 1000));
        $('#startDate > input').val(startDate.getFullYear() + "-" + zeroAppend(startDate.getMonth() + 1) + "-" + zeroAppend(startDate.getDate()));
        $('#endDate > input').val(endDate.getFullYear() + "-" + zeroAppend(endDate.getMonth() + 1) + "-" + zeroAppend(endDate.getDate()));
    }

    /** setting code */
    setCommonCodeList();

});