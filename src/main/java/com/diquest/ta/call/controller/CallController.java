package com.diquest.ta.call.controller;

import com.diquest.common.constant.CommonConstants;
import com.diquest.common.util.AppUtil;
import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.repository.CallRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
@RequestMapping("/call")
public class CallController {
    private static final Logger LOG = LoggerFactory.getLogger(CallController.class);

    @Resource(name = "messageSource")
    private MessageSource messageSource;

    @Autowired
    private CallRepository callRepository;

    /**
     * @MethodName : viewCallList
     * @date : 2020.10.27
     * @author : ejh
     * @description : 상담 콜 조회 화면
     */
    @GetMapping("/viewCallList.do")
    public String viewCallList(Model model, Pageable pageable) {
        return "call/callList";
    }

    @PostMapping("/retrieveCallList.do")
    public String retrieveCallList(Model model, Pageable pageable) {
        LOG.debug("method : retrieveCallList");
        LOG.debug("model : " + model);
        LOG.debug("pageable : " + pageable);

        boolean status = true;
        StopWatch stopWatch = new StopWatch();

        String resultCode = CommonConstants.RESULT_CODE0.getValue();
        String resultMessage = CommonConstants.RESULT_MESSAGE0.getValue();

        if (status) {
            try {
                stopWatch.start();
                List<CallEntity> callList = callRepository.findByYyyymmdd("20200520", pageable);

                model.addAttribute("callList", callList);
                model.addAttribute(CommonConstants.RESULT_CODE_NAME, resultCode);
                model.addAttribute(CommonConstants.RESULT_MESSAGE_NAME, resultMessage);
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

        return "call/callList :: #dataTableExample_wrapper";
    }

    @GetMapping("/viewCallList2.do")
    public String viewCallList2(Model model, Pageable pageable) {
        return "call/callList2";
    }


    @PostMapping("/retrieveCallList2.do")
    public String retrieveCallList2(Model model,
                                    @PageableDefault(size = 10) Pageable pageable,
                                    @RequestParam(required = false, defaultValue = "") String searchText) {

        Page<CallEntity> callList = callRepository.findByYyyymmddContaining(searchText, pageable);

        int viewPageSize = 10;
        long totalElementsNumber = callList.getTotalElements();
        int totalPagesNumber = callList.getTotalPages();
        int currentPageNumber = callList.getPageable().getPageNumber();
        int startPage = 1 * viewPageSize * (currentPageNumber / 10);
        int endPage = startPage + viewPageSize - 1;
        int size = callList.getSize();

        model.addAttribute("viewPageSize", viewPageSize);
        model.addAttribute("totalElementsNumber", totalElementsNumber);
        model.addAttribute("totalPagesNumber", totalPagesNumber);
        model.addAttribute("currentPageNumber", currentPageNumber);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("searchText", searchText);
        model.addAttribute("size", size);
        model.addAttribute("callList", callList);

        return "call/callList2 :: #dataTableExample_wrapper";
    }


}
