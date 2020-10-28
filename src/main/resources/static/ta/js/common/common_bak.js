/** Loading Indicator Util */
let progressCount = 0;

function progressShow() {
    if (progressCount == 0) {
        progressAddIcon();
    }
    progressCount++;
    // console.log("===== show loading.. : " + progressCount + "=====");
    // $.log.debug("===== show loading.. progressState : " + progressCount + "=====");
}

function progressHide() {
    progressCount--;

    if (progressCount == 0) {
        progressRemoveIcon();
    }
    // console.log("===== hide loading.. : " + progressCount + "=====");
    // $.log.debug("===== hide loading.. progressState : " + progressCount + "=====");
}

function progressShowEach(num) {
    for (let i = 0; i < num; i++) {
        progressShow();
    }
}

function progressAddIcon() {
    $('#loading').modal('show');

}

function progressRemoveIcon() {
    $('#loading').modal('hide');
}


/** 공통 에러 체크 */
let searchResultCode = '';

function isResponseError(_json) {
    if (_json != null && _json.constructor == Object) {

        // Controller Error Check
        if (_json.hasOwnProperty("resultCode") && _json["resultCode"] != CommonConstants.RESULT_CODE0.getValue()) {
            switch (_json["resultCode"]) {
                case CommonConstants.RESULT_CODE3.getValue():
                    if (_json["resultCode"] != searchResultCode) {
                        alert('일정시간 동안 이용되지 않아 정보보호를 위하여 로그아웃 됩니다.');
                        progressShow();
                        window.location.href = "/";
//						window.location.assign(CommonConstants.SERVER_CONTEXTPATH + "/login/join.do");
                    }
                    break;
                default:
                    alert(_json["resultMessage"]);
                    break;
            }
            searchResultCode = _json["resultCode"];
            return true;
        }

        //하위 레벨에 오브젝트가 존재한다면, 재귀호출함
        for (let key in _json) {
            if (isResponseError(_json[key])) {
                return true;
            }
        }
    }
    return false;
}

/** ajax 호출 */

function fnAjax(_option) {

    if (_option.hasOwnProperty("progress") && _option["progress"] == true) {
        progressShow();
    }
    let token = $("meta[name='_csrf']").attr("content");
    let header = $("meta[name='_csrf_header']").attr("content");

    let data = null;
    if (_option["data"]) {
        if (typeof _option["data"] == 'object') {
            data = $.extend(_option["data"], {dataType: "json"});
        } else {
            data = _option["data"] + "&dataType=json";
        }
    } else {
        data = "dataType=json";
    }
    console.log('data >', data);

    let option = {
        url: _option.url
        , data: data
        , async: _option.hasOwnProperty("async") ? _option.async : true
        , type: "POST"
        , dataType: "json"
        , beforeSend: function (xhr) {   /*데이터를 전송하기 전에 헤더에 csrf값을 설정한다*/
            xhr.setRequestHeader(header, token);
        }
//			,contentType : "application/json"
        , contentType: "text/plain; charset=utf-8"
        // , contentType: "application/x-www-form-urlencoded; charset=utf-8"
        , error: function (_jqXHR, _textStatus, _errorThrown) {

            //ajax 실패
//			$.log.debug("===== call [function fnAjax error] : "+ _option.url +" =====");
            console.log(JSON.stringify(_jqXHR), true);
            // $.log.debr(JSON.stringify(_jqXHR), true);
//			$.log.debug("===== end [function fnAjax error] : "+ _option.url +" =====");

            if (_option.hasOwnProperty("error")) {
                _option.error(_jqXHR, _textStatus, _errorThrown);
            } else {
                isResponseError(_jqXHR);
            }
            if (_option.hasOwnProperty("progress") && _option["progress"] == true) {
                progressHide();
            }
        }
        , success: function (_data, _textStatus, _jqXHR) {

            //ajax 성공
            $.log.debug("===== call [function fnAjax success] : " + _option.url + " =====");
            $.log.debug(_data, true);
//			$.log.debug(_textStatus, true);
//			$.log.debug(_jqXHR, true);
            $.log.debug("===== end [function fnAjax success] : " + _option.url + " =====");

            if (isResponseError(_jqXHR) == false && _option.hasOwnProperty("success")) {
                _option.success(_data, _textStatus, _jqXHR);
            }
            if (_option.hasOwnProperty("progress") && _option["progress"] == true) {
                progressHide();
            }
        }
    };
    return $.ajax(option);
};

/**
 * 공통 코드 처리
 */
let codeList = null;

function setCommonCodeList() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
        url: "/common/retrieveCommonCodeList.do",
        type: "POST",
        cache: false
        , before: function (xhr) {
            xhr.setRequestHeader(header, token);
        }
    }).done(function (fragment) {
        console.log("fragment >", fragment);
        $("#search_condition").replaceWith(fragment);
    });

    // return fnAjax({
    //     url: "/common/retrieveCommonCodeList.do",
    //     data: '',
    //     async: false,
    //     progress: true,
    //     success: function (_data, _textStatus, _jqXHR) {
    //         console.log('setCommoncodeList', _data);
    //         codeList = _data.list;
    //     }
    // });
}

function getCommoncodeList(groupCode) {
    if (codeList) {
        if (!groupCode) return codeList;

        let temp = [];
        codeList.forEach(function (o, i) {
            if (o.groupCode == groupCode) {
                temp.push(o);
            }
        });
        return temp;
    } else {
        return [];
    }
}

function getCommonCode(groupCode, name) {
    if (codeList) {
        if (!groupCode || !name) return '';

        let temp = '';
        codeList.forEach(function (o, i) {
            if (o.groupCode == groupCode && o.name.toUpperCase() == name.toUpperCase()) {
                temp = o.code;
            }
        });
        return temp;
    } else {
        return '';
    }
}

function getCommonCodeName(groupCode, code) {
    if (codeList) {
        if (!groupCode || !code) return '';

        var temp = '';
        codeList.forEach(function (o, i) {
            if (o.groupCode == groupCode && o.code == code) {
                temp = o.name;
            }
        });
        return temp;
    } else {
        return '';
    }
}

/**
 * 공통코드로 셀렉트 박스 코드 부분 생성
 */
function createCommonCodeSelectList(el, groupCode, allFlag, codeProp, nameProp) {
    let createdCodeList;
    let createdCode;
    let createdName;
    if (!el || !groupCode) {
        return;
    }

    el.empty();


    if (allFlag) {
        el.append($("<option>").attr('value', '').text('전체'));
    }

    createdCodeList = getCommoncodeList(groupCode);

    if (groupCode == 'TENENT_LIST') {
        console.log('createdCodeList', createdCodeList);
    }

    if (createdCodeList) {
        createdCodeList.forEach(function (o, i) {
            if (o.groupCode == groupCode) {

                if (codeProp && codeProp != null) {
                    createdCode = o[codeProp];
                } else {
                    createdCode = o.code;
                }

                if (nameProp && nameProp != null) {
                    createdName = o[nameProp];
                } else {
                    createdName = o.name;
                }

//				if(o.code == '') {
//					el.append($("<option>").attr('selected', '').attr('disabled', '').attr('hidden', '').attr('value', o.code).text(o.name));
//				} else {
                el.append($("<option>").attr('value', createdCode).text(name));
//				}
            }
        });
    } else {
        return;
    }
};

/** 셀렉트 박스 처리 */
function createSelectList(el, inputCodeList, codeIndex, nameIndex, allFlag) {
    if (!el || !inputCodeList) {
        return;
    }

    el.empty();

    if (allFlag) {
        el.append($('<option>').attr('value', '').text('전체'));
    }

    if (inputCodeList) {
        inputCodeList.forEach(function (o, i) {
            el.append($('<option>').attr('value', o[codeIndex]).text(o[nameIndex]));
        });
    } else {
        return;
    }
}

/** String 관련 Util */
function sNull(vStr) {
    let rtn = false;

    if (vStr == null || vStr == "" || vStr == "null" || vStr == "NULL" || vStr == undefined || vStr == "undefined") {
        rtn = true;
    }
    return rtn;
}


/**
 * null이나 ""을 체크하는 함수, 기본값 미지정시에는 true/false를 리턴하고, 기본값을 지정하면 원본값/기본값을 리턴한다.
 * _value : 체크할 데이터
 * _defaultData : 기본값
 */
function isEmpty(_value, _defaultData) {
    if (_value == null || _value == "") {
        if (_defaultData != null) {
            return _defaultData;
        } else {
            return true;
        }
    } else {
        if (_defaultData != null) {
            return _value;
        } else {
            return false;
        }
    }
}

// 검색 조건 셋팅
setCommonCodeList();
