package com.diquest.ta.call.controller;

import com.diquest.ta.call.model.REC_CALL_INFO;
import com.diquest.ta.call.repository.CallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/call")
public class CallController {

    @Autowired
    private CallRepository callRepository;

    @GetMapping("/list")
    public String list(Model model) {

        List<REC_CALL_INFO> callList = callRepository.findByYyyymmdd("20200520");
        model.addAttribute("callList", callList);
        return "call/list";
    }
}
