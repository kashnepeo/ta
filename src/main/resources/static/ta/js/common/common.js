

function setCommonCodeList() {
    /** var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content"); */
    $.ajax({
        url: "/common/retrieveCommonCodeList.do",
        type: "POST",
        cache: false
        /** , before: function (xhr) {
                xhr.setRequestHeader(header, token);
        }*/
    }).done(function (fragment) {
        console.log("fragment >", fragment);
        $("#search_condition").replaceWith(fragment);
    });
}
/** setting code */
setCommonCodeList();