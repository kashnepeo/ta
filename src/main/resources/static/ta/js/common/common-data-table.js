$(function () {
    'use strict';
    $('#dataTableExample').DataTable({
        "paging": false,    // previous 1 2 3 next 비활성화
        "info": false,      // Showing 1 to 10 of 22 entries 비활성화
        "searching": false  // search box 비활성화
    });
});