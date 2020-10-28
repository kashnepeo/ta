package com.diquest.ta.call.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.model.paging.Page;
import com.diquest.ta.call.model.paging.PagingRequest;
import com.diquest.ta.call.service.CallListService;

@RestController
@RequestMapping("callListRest")
public class CallRestController {

    private final CallListService callListService;

    @Autowired
    public CallRestController(CallListService callListService) {
        this.callListService = callListService;
    }

    @PostMapping
    public Page<CallEntity> list(@RequestBody PagingRequest pagingRequest) {
        return callListService.getCallLists(pagingRequest);
    }
}
