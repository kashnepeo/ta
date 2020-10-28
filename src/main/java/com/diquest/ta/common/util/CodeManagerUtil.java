package com.diquest.ta.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CodeManagerUtil {


    private volatile static CodeManagerUtil instance = null;

    private static Map<String, LinkedHashMap<String, String>> _code_list = new HashMap<String, LinkedHashMap<String, String>>();
    private static List<Object> _code_list_for_common = new ArrayList<Object>();

    // 조회구분
    public static String[][] _dateTypeArray = {
            {"dateType", "DAY", "일별"},
            {"dateType", "WEEK", "주별"},
            {"dateType", "MONTH", "월별"}
    };

    // 센터
    public static String[][] _centerTypeArray = {
            {"centerType", "SEOUL", "서울"},
            {"centerType", "BUSAN", "부산"},
            {"centerType", "DAEGU", "대구"}
    };

    public static String[][] _timeTypeArray = {
            {"timeType", "A", "오전(08:30~12:00)"},
            {"timeType", "P", "오후(12:00~18:00)"},
            {"timeType", "E", "저녁(18:00~21:00)"},
            {"timeType", "N", "밤(21:00~23:00)"}
    };

    public static String[][] _durationTypeArray = {
            {"durationType", "1", "0~60초"},
            {"durationType", "2", "1분~3분"},
            {"durationType", "3", "3분~5분"},
            {"durationType", "4", "5분~10분"},
            {"durationType", "5", "10분 이상"}
    };

    public static CodeManagerUtil getInstance() {
        if (instance == null) {
            synchronized (CodeManagerUtil.class) {
                if (instance == null) {
                    instance = new CodeManagerUtil();
                }
            }
        }

        return instance;
    }


    public static synchronized void setCodeResource(Map<String, LinkedHashMap<String, String>> list) {
        if (_code_list != null && list != null) {
            _code_list.clear();
        }
        _code_list = list;

        if (_code_list_for_common != null && list != null) {
            _code_list_for_common.clear();
        }

        for (String groupcode : list.keySet()) {
            for (String code : list.get(groupcode).keySet()) {
                HashMap<String, Object> hm = new HashMap<String, Object>();
                hm.put("groupCode", groupcode);
                hm.put("code", code);
                hm.put("name", list.get(groupcode).get(code));

                if (hm != null) {
                    _code_list_for_common.add(hm);
                }
            }
        }
    }

    public Map<String, LinkedHashMap<String, String>> getCodeResource() {
        Map<String, LinkedHashMap<String, String>> returnMap = null;

        if (_code_list != null && _code_list.size() > 0) {
            returnMap = _code_list;
        }

        return returnMap;
    }

    public List<Object> getCodeResourceForCommon() {
        List<Object> returnList = null;

        if (_code_list_for_common != null && _code_list_for_common.size() > 0) {
            returnList = _code_list_for_common;
        }

        return returnList;
    }

    public static LinkedHashMap<String, String> getCodeList(String groupCode) {
        LinkedHashMap<String, String> returnMap = null;

        if (_code_list != null && _code_list.size() > 0) {
            returnMap = _code_list.get(groupCode);
        }

        return returnMap;
    }

    public static String getCodeName(String groupCode, String code) {
        String rtn = "";

        if (_code_list != null && _code_list.size() > 0) {
            if (_code_list.containsKey(groupCode)) {
                if (_code_list.get(groupCode).containsKey(code)) {
                    rtn = _code_list.get(groupCode).get(code);
                }
            }
        }
        return rtn;
    }

    public static String getCode(String groupCode, String name) {
        String rtn = "";

        if (_code_list != null && _code_list.size() > 0) {
            for (String key : _code_list.get(groupCode).keySet()) {
                if (name.equals(_code_list.get(groupCode).get(key))) {
                    rtn = key;
                    break;
                }
            }
        }
        return rtn;
    }
}
