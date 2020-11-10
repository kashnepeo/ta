package com.diquest.ta.call.model.paging;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Code {

    private String datetype;    //조회 구분
    private String startDate;   //시작일
    private String endDate;     //종료일
    private String centerType;  //센터
    private String timeType;    //상담 시간
    private String durationType;//통화 길이
    private String searchword;  //콜 검색

}
