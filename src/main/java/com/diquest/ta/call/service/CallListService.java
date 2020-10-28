package com.diquest.ta.call.service;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import com.diquest.ta.call.repository.CallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.diquest.ta.call.model.CallEntity;
import com.diquest.ta.call.model.CallEntityComparators;
import com.diquest.ta.call.model.paging.Column;
import com.diquest.ta.call.model.paging.Order;
import com.diquest.ta.call.model.paging.Page;
import com.diquest.ta.call.model.paging.PagingRequest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CallListService {
    private static final Comparator<CallEntity> EMPTY_COMPARATOR = (e1, e2) -> 0;

    @Autowired
    private CallRepository callRepository;

    public Page<CallEntity> getCallLists(PagingRequest pagingRequest) {
        //ObjectMapper objectMapper = new ObjectMapper();

        //try {
           /* List<CallEntity> callLists = objectMapper.readValue(getClass().getClassLoader()
                            .getResourceAsStream("callList.json"),
                    new TypeReference<List<CallEntity>>() {
                    });*/

            List<CallEntity> callLists2 = callRepository.findAll();

            return getPage(callLists2, pagingRequest);

//       } catch (IOException e) {
//            log.error(e.getMessage(), e);
//        }
//
//        return new Page<>();
    }

    private Page<CallEntity> getPage(List<CallEntity> callLists, PagingRequest pagingRequest) {
        List<CallEntity> filtered = callLists.stream()
                .sorted(sortCallLists(pagingRequest))
                .filter(filterCallLists(pagingRequest))
                .skip(pagingRequest.getStart())
                .limit(pagingRequest.getLength())
                .collect(Collectors.toList());

        long count = callLists.stream()
                .filter(filterCallLists(pagingRequest))
                .count();

        Page<CallEntity> page = new Page<>(filtered);
        page.setRecordsFiltered((int) count);
        page.setRecordsTotal((int) count);
        page.setDraw(pagingRequest.getDraw());

        return page;
    }

    private Predicate<CallEntity> filterCallLists(PagingRequest pagingRequest) {
        if (pagingRequest.getSearch() == null || StringUtils.isEmpty(pagingRequest.getSearch()
                .getValue())) {
            return calList -> true;
        }

        String value = pagingRequest.getSearch()
                .getValue();

        return callList -> callList.getRFileNm()
                .toLowerCase()
                .contains(value)
                || callList.getYyyymmdd()
                .toLowerCase()
                .contains(value)
                || callList.getRUsrId()
                .toLowerCase()
                .contains(value);
    }

    private Comparator<CallEntity> sortCallLists(PagingRequest pagingRequest) {
        if (pagingRequest.getOrder() == null) {
            return EMPTY_COMPARATOR;
        }

        try {
            Order order = pagingRequest.getOrder()
                    .get(0);

            int columnIndex = order.getColumn();
            Column column = pagingRequest.getColumns()
                    .get(columnIndex);

            Comparator<CallEntity> comparator = CallEntityComparators.getComparator(column.getData(), order.getDir());
            if (comparator == null) {
                return EMPTY_COMPARATOR;
            }

            return comparator;

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return EMPTY_COMPARATOR;
    }
}
