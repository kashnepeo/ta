$(document).ready(function () {
    // $(document).off();

    /** 채팅 정보 스크롤 이벤트 **/
    if ($('.chat-aside .tab-content').length) {

        const sidebarBodyScroll = new PerfectScrollbar('.chat-aside .tab-content');
    }

    /** 채팅창 스크롤 이벤트 **/
    if ($('.chat-content .chat-body').length) {
        const sidebarBodyScroll = new PerfectScrollbar('.chat-content .chat-body');
    }

    $('.chat-list .chat-item').each(function (index) {
        $(this).off('click').on('click', function () {
            $('.chat-content').toggleClass('show');
        });
    });

    $(document).on('click', '#backToChatList', function () {
        $('.chat-content').toggleClass('show');
    });

});