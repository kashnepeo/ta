package com.diquest.ta.chat.controller;

import com.diquest.ta.call.controller.CallController;
import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.repository.CallRepository;
import com.diquest.ta.common.constant.CommonConstants;
import com.diquest.ta.common.util.AppUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/chat")
public class ChatController {
    private static final Logger LOG = LoggerFactory.getLogger(CallController.class);

    @Resource(name = "messageSource")
    private MessageSource messageSource;

    /**
     * @MethodName : viewChatList
     * @date : 2020.10.27
     * @author : ejh
     * @description : 채팅리스트 조회 화면
     */
    @GetMapping("/viewChatList.do")
    public String viewChatList(Model model, Pageable pageable) {
        return "chat/chatList";
    }

    @PostMapping("/retrieveChatList.do")
    public String retrieveCallList(Model model, Pageable pageable) {
        LOG.debug("method : retrieveChatList");
        LOG.debug("model : " + model);
        LOG.debug("pageable : " + pageable);

        boolean status = true;
        StopWatch stopWatch = new StopWatch();

        String resultCode = CommonConstants.RESULT_CODE0.getValue();
        String resultMessage = CommonConstants.RESULT_MESSAGE0.getValue();

        if (status) {
            try {
                stopWatch.start();
//                List<CallEntity> callList = callRepository.findByYyyymmdd("20200520", pageable);
//
//                model.addAttribute("callList", callList);
                model.addAttribute(CommonConstants.RESULT_CODE_NAME, resultCode);
                model.addAttribute(CommonConstants.RESULT_MESSAGE_NAME, resultMessage);
            } catch (Exception e) {
                resultCode = CommonConstants.RESULT_CODE1.getValue();
                resultMessage = this.messageSource.getMessage("fail.common.msg", null, Locale.KOREA);

                LOG.error(AppUtil.setErrLogFormat("retrieveChatList", resultCode, resultMessage, e.getMessage()));
                LOG.error(e.getMessage());
                status = false;
            } finally {
                stopWatch.stop();
                LOG.info(AppUtil.setInfoLogFormat("retrieveChatList", resultCode, resultMessage, stopWatch.getTotalTimeMillis()));
            }
        }

        return "chat/chatList :: #dataTableExample_wrapper";
    }
}
