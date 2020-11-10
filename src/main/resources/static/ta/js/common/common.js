export {fnAjaxFragment};

function fnAjaxFragment(_id, _data, _url) {
    return $.ajax({
        url: _url,
        type: "POST",
        data: _data,
        async: false,
        cache: false,
        success: function (fragment) {
            $(_id).replaceWith(fragment);
        }
    });
}

function zeroAppend(num) {
    if (num > 9) {
        return num;
    } else {
        return '0' + num;
    }
}

function setCommonCodeList() {
    fnAjaxFragment('#search_condition', {}, '/common/retrieveCommonCodeList.do');

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

$(document).ready(function () {
    /** setting code */
    setCommonCodeList();
});