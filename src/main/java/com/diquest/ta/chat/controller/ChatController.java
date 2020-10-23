package com.diquest.ta.chat.controller;

import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.repository.CallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private CallRepository callRepository;

    @GetMapping("/list")
    public String list(Model model, Pageable pageable) {
        List<CallEntity> callList = callRepository.findByYyyymmdd("20200520", pageable);
        model.addAttribute("callList", callList);
        return "call/list";
    }
}
