package com.diquest.ta.call.controller;

import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.repository.CallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/call")
public class CallController {

    @Autowired
    private CallRepository callRepository;

    @GetMapping("/viewCallList.do")
    public String viewCallList(Model model, Pageable pageable) {
        return "call/callList";
    }

    @PostMapping("/retrieveCallList.do")
    public String list(Model model, Pageable pageable) {
        List<CallEntity> callList = callRepository.findByYyyymmdd("20200520", pageable);
        model.addAttribute("callList", callList);
        return "call/callList :: #dataTableExample_wrapper";
    }

    @GetMapping("/viewCallList2.do")
    public String viewCallList2(Model model, Pageable pageable) {
        return "call/callList2";
    }


    @PostMapping("/retrieveCallList2.do")
    public String retrieveCallList2(Model model,
                        @PageableDefault(size = 10)  Pageable pageable,
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
