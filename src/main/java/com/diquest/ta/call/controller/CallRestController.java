package com.diquest.ta.call.controller;

import com.diquest.ta.common.constant.CommonConstants;
import com.diquest.ta.common.util.AppUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.model.paging.Page;
import com.diquest.ta.call.model.paging.PagingRequest;
import com.diquest.ta.call.service.CallListService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/callRest")
public class CallRestController {
    private static final Logger LOG = LoggerFactory.getLogger(CallRestController.class);

    @Resource(name = "messageSource")
    private MessageSource messageSource;

    @Autowired
    private CallListService callListService;

    @PostMapping("/retrieveCallList.do")
    public Page<CallEntity> retrieveCallList(@RequestBody PagingRequest pagingRequest) {
        LOG.debug("method : retrieveCallList");

        boolean status = true;
        StopWatch stopWatch = new StopWatch();

        String resultCode = CommonConstants.RESULT_CODE0.getValue();
        String resultMessage = CommonConstants.RESULT_MESSAGE0.getValue();

        Page<CallEntity> callList = null;
        if (status) {
            try {
                stopWatch.start();
                callList = callListService.getCallLists(pagingRequest);
            } catch (Exception e) {
                resultCode = CommonConstants.RESULT_CODE1.getValue();
                resultMessage = this.messageSource.getMessage("fail.common.msg", null, Locale.KOREA);

                LOG.error(AppUtil.setErrLogFormat("retrieveCallList", resultCode, resultMessage, e.getMessage()));
                LOG.error(e.getMessage());
                status = false;
            } finally {
                stopWatch.stop();
                LOG.info(AppUtil.setInfoLogFormat("retrieveCallList", resultCode, resultMessage, stopWatch.getTotalTimeMillis()));
            }
        }

        return callList;
    }
}
