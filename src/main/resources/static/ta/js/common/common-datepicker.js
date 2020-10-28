$(function () {


    /**
     * 날짜양식변경
     * _yyyyMMdd : yyyyMMdd형태의 날짜 데이터(yyyyMMddhhmmss)형태까지 변환가능
     * _seperator : 날짜양식(예: yyyy-MM-dd hh:mm:ss)
     */
    function dateFormatter(_yyyyMMdd, _seperator) { // '2018-02-23', 'yyyy-MM-dd'
        _yyyyMMdd = _yyyyMMdd.replace(/-| |:/gi, '');

        var year, month, day, hour, min, sec;
        if (_yyyyMMdd.length >= 4) {
            year = _yyyyMMdd.substr(0, 4);
        }

        if (_yyyyMMdd.length >= 6) {
            month = _yyyyMMdd.substr(4, 2);
        }

        if (_yyyyMMdd.length >= 8) {
            day = _yyyyMMdd.substr(6, 2);
        }

        if (_yyyyMMdd.length >= 10) {
            hour = _yyyyMMdd.substr(8, 2);
        }

        if (_yyyyMMdd.length >= 12) {
            min = _yyyyMMdd.substr(10, 2);
        }

        if (_yyyyMMdd.length >= 14) {
            sec = _yyyyMMdd.substr(12, 2);
        }

        _seperator = _seperator.replace('yyyy', year);
        _seperator = _seperator.replace('MM', month);
        _seperator = _seperator.replace('dd', day);
        _seperator = _seperator.replace('hh', hour);
        _seperator = _seperator.replace('mm', min);
        _seperator = _seperator.replace('ss', sec);

        console.log('_seperator > ',_seperator);
        return _seperator;
    };

    // 조회 구분
    // if ($('#dateType').length > 0) {
    //     $('#dateType').empty();
    // }

    if ($('#startDate') && $('#startDate').data('DateTimePicker')) {
        $('#startDate').data('DateTimePicker').destroy();
        $("#startDate").off("dp.change");
    }

    if ($('#endDate') && $('#endDate').data('DateTimePicker')) {
        $('#endDate').data('DateTimePicker').destroy();
        $("#endDate").off("dp.change");
    }

    $('#dateType').change(function () {
        if ($('#startDate') && $('#startDate').data('DateTimePicker')) {
            $('#startDate').data('DateTimePicker').destroy();
        }

        if ($('#endDate') && $('#endDate').data('DateTimePicker')) {
            $('#endDate').data('DateTimePicker').destroy();
        }
        $("#startDate").off("dp.change");
        $("#endDate").off("dp.change");

        if ($(this).val() == 'MON') {
            // 월별
            $('#startDate').datepicker({
                locale: 'ko',
                viewMode: 'months',
                format: 'YYYY-MM'
            });
            $('#endDate').datepicker({
                locale: 'ko',
                viewMode: 'months',
                format: 'YYYY-MM'
            });
        } else if ($(this).val() == 'WEEK') {
            // 주별 ----------------------------------------------------------
            $('#startDate').datepicker({
                locale: 'ko',
                format: 'YYYY-MM-DD'
            });
            $('#endDate').datepicker({
                locale: 'ko',
                format: 'YYYY-MM-DD'
            });

            var firstValue = $("#startDate input").val();
            var firstDate = moment(firstValue, "YYYY-MM-DD").day(0).format("YYYY-MM-DD");
            $("#startDate input").val(firstDate);

            var lastValue = $("#endDate input").val();
            var lastDate = "";
            if (getDayOfWeek(lastValue.replace(/-/gi, "")) == "일") {
                lastDate = $("#endDate input").val();
            } else {
                lastDate = moment(lastValue, "YYYY-MM-DD").day(6).format("YYYY-MM-DD");
            }
            $("#endDate input").val(lastDate);

        } else if ($(this).val() == 'DAY') {
            // 일별 ------------------------------------------------------------
            $('#startDate').datepicker({
                locale: 'ko',
                format: 'YYYY-MM-DD'
            });
            $('#endDate').datepicker({
                locale: 'ko',
                format: 'YYYY-MM-DD'
            });

            $('#startDate > input').val(dateFormatter(getDate('DAY', -7).substring(0, 8), 'yyyy-MM-dd'));
            $('#endDate > input').val(dateFormatter(getDate('DAY', -1).substring(0, 8), 'yyyy-MM-dd'));

        } else if ($(this).val() == 'HOUR') {
            // 시간별 -----------------------------------------------------------
            $('#startDate').datepicker({
                locale: 'ko',
                format: 'YYYY-MM-DD HH'
            });
            $('#endDate').datepicker({
                locale: 'ko',
                format: 'YYYY-MM-DD HH'
            });
        }

        // 달력icon클릭시 주별일경우 백그라운드 색상 추가
        $("#startDateSpan").click(function () {
            if ($("#dateType").val() == 'WEEK') {
                $(".bootstrap-datetimepicker-widget tr").hover(function () {
                    $(this).css("background-color", "#808080");
                }, function () {
                    $(this).css("background-color", "#fff");
                });
            }
        });
        $("#endDateSpan").click(function () {
            if ($("#dateType").val() == 'WEEK') {
                $(".bootstrap-datetimepicker-widget tr").hover(function () {
                    $(this).css("background-color", "#808080");
                }, function () {
                    $(this).css("background-color", "#fff");
                });
            }
        });

        $("#startDate").on("dp.change", function (e) {
            if ($("#dateType").val() == 'WEEK') { // 주별일경우
                var value = $("#startDate input").val();
                var firstDate = moment(value, "YYYY-MM-DD").day(0).format("YYYY-MM-DD");
                $("#startDate input").val(firstDate);
//				$('#endDate').data("DateTimePicker").minDate(e.date);
            } else {
//				$('#endDate').data("DateTimePicker").minDate(e.date);
            }
        });
        $("#endDate").on("dp.change", function (e) {
            if ($("#dateType").val() == 'WEEK') { // 주별일경우
                var value = $("#endDate input").val();
                var lastDate = moment(value, "YYYY-MM-DD").day(6).format("YYYY-MM-DD");
                $("#endDate input").val(lastDate);
//				$('#startDate').data("DateTimePicker").maxDate(e.date);
            } else {
//				$('#startDate').data("DateTimePicker").maxDate(e.date);
            }
        });

    });

    //기간 - 시작기간
    $('#startDate').datepicker({
        locale: 'ko',
        format: 'YYYY-MM-DD',
    });

    //기간 - 종료기간.
    $('#endDate').datepicker({
        locale: 'ko',
        format: 'YYYY-MM-DD',
    });

    $("#dateType").val("DAY");
    $("#dateType").change();

    // 달력 초기값 세팅.
    $('#startDate > input').val(dateFormatter('2018-12-01', 'yyyy-MM-dd'));
    $('#endDate > input').val(dateFormatter('2018-12-07', 'yyyy-MM-dd'));

//	$('#startDate > input').val(dateFormatter(getDate('DAY', -7).substring(0, 8), 'yyyy-MM-dd'));
//	$('#endDate > input').val(dateFormatter(getDate('DAY', -1).substring(0, 8), 'yyyy-MM-dd'));

//	$('#dayOfWeek').val(1);

    // 달력 값 변경시 MIN, MAX값 제한.
    $("#startDate").on("dp.change", function (e) {
//		$('#endDate').data("DateTimePicker").minDate(e.date);
    });
    $("#endDate").on("dp.change", function (e) {
//		$('#startDate').data("DateTimePicker").maxDate(e.date);
    });

    function validateSearchCondition() {

        var callTimeExp = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/; // 통화시간
        if($('#callTime').length > 0) {
            if(!callTimeExp.test($("#callTime").val())) {
                alert("입력한 통화시간이 올바르지 않습니다.");
                return true;
            }
        }

        var rtn = false,
            dateType,
            relationDateType,
            startDate,
            endDate,
            validateDateFormat,
            validateMaxNum,
            alertMessage,
            addDate = '';

        // 날짜 validater
        if($('#dateType').length > 0) {
            dateType = $('#dateType').val();
            startDate = $('#startDate > input').val().replace(/[-| ]/img,'');
            endDate = $('#endDate > input').val().replace(/[-| ]/img,'');

            if(Number(startDate) > Number(endDate)) {
                alert("시작날짜가 종료날짜보다 큽니다.");
                return true;
            }

            var monthExp = /^(20)([0-9]{2})-([0-9]{2})$/; // 월별
            var dayExp = /^(20)([0-9]{2})-([0-9]{2})-([0-9]{2})$/; // 일별
            var hourExp = /^(20)([0-9]{2})-([0-9]{2})-([0-9]{2}) ([0-9]{2})$/; // 시별

            if(dateType == 'DAY') {
                if(!dayExp.test($('#startDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                if(!dayExp.test($('#endDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                validateDateFormat = 'yyyy-MM-dd';
                validateMaxNum = Common.Constants.valiateMaxDay;
                alertMessage = '일별 검색 최대 검색 기간은 '+(Common.Constants.valiateMaxDay+1)+'일 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            } else if(dateType == 'HOUR') {
                if(!hourExp.test($('#startDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                if(!hourExp.test($('#endDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                validateDateFormat = 'yyyy-MM-dd hh';
                validateMaxNum = Common.Constants.valiateMaxHour;
                alertMessage = '시간별 검색 최대 검색 기간은 '+Common.Constants.valiateMaxHour+'시간 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            } else if(dateType == 'MON') {
                if(!monthExp.test($('#startDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                if(!monthExp.test($('#endDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                validateDateFormat = 'yyyy-MM';
                validateMaxNum = Common.Constants.valiateMaxMonth;
                alertMessage = '월별 검색시 최대 검색 기간은 '+Common.Constants.valiateMaxMonth+'개월 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
                addDate = '01';
            } else if(dateType == 'WEEK') {
                if(!dayExp.test($('#startDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                if(!dayExp.test($('#endDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                validateDateFormat = 'yyyy-MM-dd';
                validateMaxNum = Common.Constants.valiateMaxWeek;
                alertMessage = '주별 검색시 최대 검색 기간은 '+Common.Constants.valiateMaxWeek+'주 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
                dateType = 'DAYOFWEEK';
            } else { // 기본 day
                if(!dayExp.test($('#startDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                if(!dayExp.test($('#endDate > input').val())) {
                    alert("입력한 날짜가 올바르지 않습니다.");
                    return true;
                }
                validateDateFormat = 'yyyy-MM-dd';
                validateMaxNum = Common.Constants.valiateMaxDay;
                alertMessage = '일별 검색 최대 검색 기간은 '+Common.Constants.valiateMaxDay+'일 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            }

            if(!Common.Date.checkMaxDate(dateType, startDate, endDate, validateMaxNum)) {
                if( confirm(alertMessage) ) {
                    // startDate 에 최대값 적용
                    $('#startDate').data("DateTimePicker").date($('#startDate > input').val());
                    $('#endDate > input').val(dateFormatter(getDate(dateType, validateMaxNum, startDate) + addDate, validateDateFormat));
                    $('#endDate').data("DateTimePicker").date($('#endDate > input').val());
                    rtn = false;
                } else {
                    rtn = true;
                }
            }
        }
        return rtn;
    }


    function getDate(_type, _addNum, _compDate) {
        var _minusMilliseconds,
            _minusDate,
            _nowDate,
            _year,
            _month,
            _day,
            _hour,
            _minute,
            _seconds;

        if(arguments.length > 2) {
            _year = _compDate.substr(0,4);
            _month = isEmpty(_compDate.substr(4,2), '01');
            _day = isEmpty(_compDate.substr(6,2), '01');
            _hour = isEmpty(_compDate.substr(8,2), '');
            _minute = isEmpty(_compDate.substr(10,2), '');
            _seconds = isEmpty(_compDate.substr(12,2), '');
            _nowDate = new Date(Date.parse(_year+'/'+_month+'/'+_day+' '+_hour+':'+_minute+':'+_seconds));
        } else {
            _nowDate = new Date();
        }

        if(_type == 'MON') {
            _minusDate = new Date(_nowDate.getFullYear(), _nowDate.getMonth() + (_addNum), _nowDate.getDate());
        } else if(_type == 'YEAR') {
            _minusDate = new Date(_nowDate.getFullYear() + (_addNum), _nowDate.getMonth(), _nowDate.getDate());
        } else {
            if(_type == 'DAY') {
                _minusMilliseconds = _addNum*24*60*60*1000;
            } else if(_type == 'HOUR') {
                _minusMilliseconds = _addNum*60*60*1000;
            } else if(_type == 'DAYOFWEEK') {
                _minusMilliseconds = _addNum*7*24*60*60*1000;
//		} else if(_type == 'YEAR') {
//			_minusMilliseconds = _addNum*365*24*60*60*1000;
            } else { // 기본 day
                _minusMilliseconds = _addNum*7*24*60*60*1000;
            }
            _minusDate = new Date(Date.parse(_nowDate) + (_minusMilliseconds));
        }

        _year = _minusDate.getFullYear();
        _month = _minusDate.getMonth() + 1;
        _month = _month.toString().length == 1 ? '0' + _month : _month;
        _day = _minusDate.getDate();
        _day = _day.toString().length == 1 ? '0' + _day : _day;
        _hour = _minusDate.getHours();
        _hour = _hour.toString().length == 1 ? '0' + _hour : _hour;
        _minute = _minusDate.getMinutes();
        _minute = _minute.toString().length == 1 ? '0' + _minute : _minute;
        _seconds = _minusDate.getSeconds();
        _seconds = _seconds.toString().length == 1 ? '0' + _seconds : _seconds;
        return '' + _year + _month + _day + _hour + _minute + _seconds;
    };

    /**
     * 날짜 최대치 확인
     * _type : 날짜 구분, DAT / HOUR / DAYOFWEEK / MON / YEAR
     * _date1 : yyyyMMdd형태의 날짜 데이터(yyyyMMddhhmmss)형태까지 변환가능
     * _date2 : yyyyMMdd형태의 날짜 데이터(yyyyMMddhhmmss)형태까지 변환가능
     * _maxNum : 최대 날짜
     */
// Common.Date.checkMaxDate('DAY', '20160501', '20160801', 7);
// Common.Date.checkMaxDate('YEAR', '2015', '2017', 2);
    function checkMaxDate(_type, _date1, _date2, _maxNum) {	// _date2 값이 _date1 에서 _maxNum 더한 날짜보다 작은경우 turn, 큰경우 false
        let rtn = true,
            date2,
            maxDate
        ;

        // _date1 의 최대날짜를 구한다.
        date2 = getDate(_type, 0, _date2);
        maxDate = getDate(_type, _maxNum, _date1);

        // 최대날짜와 _date2 를 date 타입으로 형변환한다.
        date2 = new Date(date2.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'));
        maxDate = new Date(maxDate.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'));

        // _쵀대날짜와 _date2 값을 비교한다.
        if(date2.getTime() > maxDate.getTime()) {
            rtn = false;
        }

        return rtn;
    }

    function getDayOfWeek(_date) {
        let week = new Array('일', '월', '화', '수', '목', '금', '토');
        let day = getDate('DAY', 0, _date);
        let weekOfDay = week[ new Date( day.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1') ).getDay() ];
        return weekOfDay;
    };

    function getTextFormatDate(_type, _date) {
        let rtnText = '';
        let dayType = 0;	// 0:default, 1:red, 2:blue

        if(_type == 'DAY' || _type == 'DAYOFWEEK') {
            dayType = getDayType(_date);
            rtnText = _date.substring(4, 6) + '월' + _date.substring(6, 8) + '일(' + getDayOfWeek(_date) + ')';
        } else if(_type == 'HOUR') {
            dayType = Common.Date.getDayType(_date);
            rtnText = _date.substring(4, 6) + '월' + _date.substring(6, 8) + '일(' + getDayOfWeek(_date.substring(0, 8)) + ') ' + _date.substring(9);
        } else if(_type == 'MON') {
//		rtnText = _date.substring(0, 4) + '년' + _date.substring(4, 6) + '월';
            rtnText = _date;
        } else if(_type == 'YEAR') {
//		rtnText = _date.substring(0, 4) + '년';
            rtnText = _date;
        } else {
            rtnText = _date;
        }

        if(dayType == 1) {
            rtnText = '<span style="fill: red;">' + rtnText + '</span>';
        } else if(dayType == 2) {
            rtnText = '<span style="fill: blue;">' + rtnText + '</span>';
        }

        return rtnText;
    }

    function getDayType(_date){
        var dayType = 0;	// 0:default, 1:red, 2:blue
        var syyyymmdd = _date.substring(0, 8);
        var smmdd = syyyymmdd.substring(4, 8);
        var lmmdd = solar2Lunar(syyyymmdd).substring(5, 9);

        if(getDayOfWeek(syyyymmdd) == '토') {
            dayType = 2;
        }
        if(dateSolar.indexOf(smmdd) > -1 || dateLunar.indexOf(lmmdd) > -1 || dateAltHoliday.indexOf(syyyymmdd) > -1 || getDayOfWeek(syyyymmdd) == '일') {
            dayType = 1;
        }

        return dayType;
    };

    function solar2Lunar(sDate) {
        let sMd = "31,0,31,30,31,30,31,31,30,31,30,31";
        let aMd = new Array();
        let aBaseInfo = new Array();
        let aDt = new Array(); // 매년의 음력일수를 저장할 배열 변수
        let td; // 음력일을 계산하기 위해 양력일과의 차이를 저장할 변수
        let td1; // 1840년까지의 날수
        let td2; // 현재까지의 날수
        let mm; // 임시변수
        let nLy, nLm, nLd; // 계산된 음력 년, 월, 일을 저장할 변수
        let sLyoon; // 현재월이 윤달임을 표시

        if (isEmpty(sDate)) {
            return "";
        }

        let sY = parseInt(sDate.substr(0, 4), 10);
        let sM = parseInt(sDate.substr(4, 2), 10);
        let sD = parseInt(sDate.substr(6, 2), 10);
        if (sY < 1841 || sY > 2043) {
            return "";
        }

        aBaseInfo = SolarBase();
        aMd = sMd.split(",");
        if (isLeapYear(sDate) == true) {
            aMd[1] = 29;
        } else {
            aMd[1] = 28;
        }

        td1 = 672069; // 672069 = 1840 * 365 + 1840/4 - 1840/100 + 1840/400 + 23
        // //1840년까지 날수

        // 1841년부터 작년까지의 날수
        td2 = (sY - 1) * 365 + parseInt((sY - 1) / 4) - parseInt((sY - 1) / 100)
            + parseInt((sY - 1) / 400);

        // 전월까지의 날수를 더함
        for (let i = 0; i <= sM - 2; i++)
            td2 = td2 + parseInt(aMd[i]);
        // 현재일까지의 날수를 더함
        td2 = td2 + sD;
        // 양력현재일과 음력 1840년까지의 날수의 차이
        td = td2 - td1 + 1;

        // 1841년부터 음력날수를 계산
        for (let i = 0; i <= sY - 1841; i++) {
            aDt[i] = 0;
            for (let j = 0; j <= 11; j++) {
                switch (parseInt(aBaseInfo[i * 12 + j])) {
                    case 1:
                        mm = 29;
                        break;
                    case 2:
                        mm = 30;
                        break;
                    case 3:
                        mm = 58; // 29 + 29
                        break;
                    case 4:
                        mm = 59; // 29 + 30
                        break;
                    case 5:
                        mm = 59; // 30 + 29
                        break;
                    case 6:
                        mm = 60; // 30 + 30
                        break;
                }
                aDt[i] = aDt[i] + mm;
            }
        }

        // 1840년 이후의 년도를 계산 - 현재까지의 일수에서 위에서 계산된 1841년부터의 매년 음력일수를 빼가면수 년도를 계산
        nLy = 0;
        do {
            td = td - aDt[nLy];
            nLy = nLy + 1;
        } while (td > aDt[nLy]);

        nLm = 0;
        sLyoon = "0"; // 현재월이 윤달임을 표시할 변수 - 기본값 평달
        let m1;
        let m2;
        do {
            if (parseInt(aBaseInfo[nLy * 12 + nLm]) <= 2) {
                mm = parseInt(aBaseInfo[nLy * 12 + nLm]) + 28;
                if (td > mm) {
                    td = td - mm;
                    nLm = nLm + 1;
                } else {
                    break;
                }
            } else {
                switch (parseInt(aBaseInfo[nLy * 12 + nLm])) {
                    case 3:
                        m1 = 29;
                        m2 = 29;
                        break;
                    case 4:
                        m1 = 29;
                        m2 = 30;
                        break;
                    case 5:
                        m1 = 30;
                        m2 = 29;
                        break;
                    case 6:
                        m1 = 30;
                        m2 = 30;
                        break;
                }

                if (td > m1) {
                    td = td - m1;
                    if (td > m2) {
                        td = td - m2;
                        nLm = nLm + 1;
                    } else {
                        sLyoon = "1";
                    }
                } else {
                    break;
                }
            }
        } while (1);

        nLy = nLy + 1841;
        nLm = nLm + 1;
        nLd = td;
        return sLyoon + nLy + Common.Util.getRight("0" + nLm, 2) + Common.Util.getRight("0" + nLd, 2);
    };

    function isLeapYear(sDate) {
        let ret;
        let nY;

        if (isEmpty(sDate)) {
            return false;
        }

        nY = parseInt(sDate.substring(0, 4), 10);
        if ((nY % 4) == 0) {
            if ((nY % 100) != 0 || (nY % 400) == 0) {
                ret = true;
            } else {
                ret = false;
            }
        } else {
            ret = false;
        }

        return ret;
    };

    function SolarBase() {
        var kk;

        //1841
        kk = "1,2,4,1,1,2,1,2,1,2,2,1,";
        kk += "2,2,1,2,1,1,2,1,2,1,2,1,";
        kk += "2,2,2,1,2,1,4,1,2,1,2,1,";
        kk += "2,2,1,2,1,2,1,2,1,2,1,2,";
        kk += "1,2,1,2,2,1,2,1,2,1,2,1,";
        kk += "2,1,2,1,5,2,1,2,2,1,2,1,";
        kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
        kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
        kk += "2,1,2,3,2,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
        //1851
        kk += "2,2,1,2,1,1,2,1,2,1,5,2,";
        kk += "2,1,2,2,1,1,2,1,2,1,1,2,";
        kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
        kk += "1,2,1,2,1,2,5,2,1,2,1,2,";
        kk += "1,1,2,1,2,2,1,2,2,1,2,1,";
        kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
        kk += "1,2,1,1,5,2,1,2,1,2,2,2,";
        kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
        kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
        kk += "2,1,6,1,1,2,1,1,2,1,2,2,";
        //1861
        kk += "1,2,2,1,2,1,2,1,2,1,1,2,";
        kk += "2,1,2,1,2,2,1,2,2,3,1,2,";
        kk += "1,2,2,1,2,1,2,2,1,2,1,2,";
        kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,1,2,4,1,2,2,1,2,2,1,";
        kk += "2,1,1,2,1,1,2,2,1,2,2,2,";
        kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
        kk += "1,2,2,3,2,1,1,2,1,2,2,1,";
        kk += "2,2,2,1,1,2,1,1,2,1,2,1,";
        kk += "2,2,2,1,2,1,2,1,1,5,2,1,";
        //1871
        kk += "2,2,1,2,2,1,2,1,2,1,1,2,";
        kk += "1,2,1,2,2,1,2,1,2,2,1,2,";
        kk += "1,1,2,1,2,4,2,1,2,2,1,2,";
        kk += "1,1,2,1,2,1,2,1,2,2,2,1,";
        kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
        kk += "2,2,1,1,5,1,2,1,2,2,1,2,";
        kk += "2,2,1,1,2,1,1,2,1,2,1,2,";
        kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
        kk += "2,2,4,2,1,2,1,1,2,1,2,1,";
        kk += "2,1,2,2,1,2,2,1,2,1,1,2,";
        //1881
        kk += "1,2,1,2,1,2,5,2,2,1,2,1,";
        kk += "1,2,1,2,1,2,1,2,2,1,2,2,";
        kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
        kk += "2,1,1,2,3,2,1,2,2,1,2,2,";
        kk += "2,1,1,2,1,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
        kk += "2,2,1,5,2,1,1,2,1,2,1,2,";
        kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
        kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
        kk += "1,5,2,1,2,2,1,2,1,2,1,2,";
        //1891
        kk += "1,2,1,2,1,2,1,2,2,1,2,2,";
        kk += "1,1,2,1,1,5,2,2,1,2,2,2,";
        kk += "1,1,2,1,1,2,1,2,1,2,2,2,";
        kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,5,1,2,1,2,1,2,1,";
        kk += "2,2,2,1,2,1,1,2,1,2,1,2,";
        kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
        kk += "2,1,5,2,2,1,2,1,2,1,2,1,";
        kk += "2,1,2,1,2,1,2,2,1,2,1,2,";
        kk += "1,2,1,1,2,1,2,5,2,2,1,2,";
        //1901
        kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
        kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
        kk += "1,2,1,2,3,2,1,1,2,2,1,2,";
        kk += "2,2,1,2,1,1,2,1,1,2,2,1,";
        kk += "2,2,1,2,2,1,1,2,1,2,1,2,";
        kk += "1,2,2,4,1,2,1,2,1,2,1,2,";
        kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
        kk += "2,1,1,2,2,1,2,1,2,2,1,2,";
        kk += "1,5,1,2,1,2,1,2,2,2,1,2,";
        kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
        //1911
        kk += "2,1,2,1,1,5,1,2,2,1,2,2,";
        kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
        kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
        kk += "2,2,1,2,5,1,2,1,2,1,1,2,";
        kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
        kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
        kk += "2,3,2,1,2,2,1,2,2,1,2,1,";
        kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
        kk += "1,2,1,1,2,1,5,2,2,1,2,2,";
        kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
        //1921
        kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
        kk += "2,1,2,2,3,2,1,1,2,1,2,2,";
        kk += "1,2,2,1,2,1,2,1,2,1,1,2,";
        kk += "2,1,2,1,2,2,1,2,1,2,1,1,";
        kk += "2,1,2,5,2,1,2,2,1,2,1,2,";
        kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
        kk += "1,5,1,2,1,1,2,2,1,2,2,2,";
        kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
        kk += "1,2,2,1,1,5,1,2,1,2,2,1,";
        //1931
        kk += "2,2,2,1,1,2,1,1,2,1,2,1,";
        kk += "2,2,2,1,2,1,2,1,1,2,1,2,";
        kk += "1,2,2,1,6,1,2,1,2,1,1,2,";
        kk += "1,2,1,2,2,1,2,2,1,2,1,2,";
        kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,4,1,2,1,2,1,2,2,2,1,";
        kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
        kk += "2,2,1,1,2,1,4,1,2,2,1,2,";
        kk += "2,2,1,1,2,1,1,2,1,2,1,2,";
        kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
        //1941
        kk += "2,2,1,2,2,4,1,1,2,1,2,1,";
        kk += "2,1,2,2,1,2,2,1,2,1,1,2,";
        kk += "1,2,1,2,1,2,2,1,2,2,1,2,";
        kk += "1,1,2,4,1,2,1,2,2,1,2,2,";
        kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
        kk += "2,1,1,2,1,1,2,1,2,2,1,2,";
        kk += "2,5,1,2,1,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
        kk += "2,2,1,2,1,2,3,2,1,2,1,2,";
        kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
        //1951
        kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
        kk += "1,2,1,2,4,2,1,2,1,2,1,2,";
        kk += "1,2,1,1,2,2,1,2,2,1,2,2,";
        kk += "1,1,2,1,1,2,1,2,2,1,2,2,";
        kk += "2,1,4,1,1,2,1,2,1,2,2,2,";
        kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,2,1,1,5,2,1,2,2,";
        kk += "1,2,2,1,2,1,1,2,1,2,1,2,";
        kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
        kk += "2,1,2,1,2,5,2,1,2,1,2,1,";
        //1961
        kk += "2,1,2,1,2,1,2,2,1,2,1,2,";
        kk += "1,2,1,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,2,3,2,1,2,1,2,2,2,1,";
        kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
        kk += "1,2,1,2,1,1,2,1,1,2,2,1,";
        kk += "2,2,5,2,1,1,2,1,1,2,2,1,";
        kk += "2,2,1,2,2,1,1,2,1,2,1,2,";
        kk += "1,2,2,1,2,1,5,2,1,2,1,2,";
        kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
        kk += "2,1,1,2,2,1,2,1,2,2,1,2,";
        //1971
        kk += "1,2,1,1,5,2,1,2,2,2,1,2,";
        kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
        kk += "2,1,2,1,1,2,1,1,2,2,2,1,";
        kk += "2,2,1,5,1,2,1,1,2,2,1,2,";
        kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
        kk += "2,2,1,2,1,2,1,5,2,1,1,2,";
        kk += "2,1,2,2,1,2,1,2,1,2,1,1,";
        kk += "2,2,1,2,1,2,2,1,2,1,2,1,";
        kk += "2,1,1,2,1,6,1,2,2,1,2,1,";
        kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
        //1981
        kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
        kk += "2,1,2,3,2,1,1,2,2,1,2,2,";
        kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
        kk += "2,1,2,2,1,1,2,1,1,5,2,2,";
        kk += "1,2,2,1,2,1,2,1,1,2,1,2,";
        kk += "1,2,2,1,2,2,1,2,1,2,1,1,";
        kk += "2,1,2,2,1,5,2,2,1,2,1,2,";
        kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
        kk += "1,2,1,1,5,1,2,1,2,2,2,2,";
        //1991
        kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
        kk += "1,2,2,1,1,2,1,1,2,1,2,2,";
        kk += "1,2,5,2,1,2,1,1,2,1,2,1,";
        kk += "2,2,2,1,2,1,2,1,1,2,1,2,";
        kk += "1,2,2,1,2,2,1,5,2,1,1,2,";
        kk += "1,2,1,2,2,1,2,1,2,2,1,2,";
        kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,1,2,3,2,2,1,2,2,2,1,";
        kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
        kk += "2,2,1,1,2,1,1,2,1,2,2,1,";
        //2001
        kk += "2,2,2,3,2,1,1,2,1,2,1,2,";
        kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
        kk += "2,2,1,2,2,1,2,1,1,2,1,2,";
        kk += "1,5,2,2,1,2,1,2,2,1,1,2,";
        kk += "1,2,1,2,1,2,2,1,2,2,1,2,";
        kk += "1,1,2,1,2,1,5,2,2,1,2,2,";
        kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
        kk += "2,1,1,2,1,1,2,1,2,2,1,2,";
        kk += "2,2,1,1,5,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
        //2011
        kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
        kk += "2,1,6,2,1,2,1,1,2,1,2,1,";
        kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
        kk += "1,2,1,2,1,2,1,2,5,2,1,2,";
        kk += "1,2,1,1,2,1,2,2,2,1,2,2,";
        kk += "1,1,2,1,1,2,1,2,2,1,2,2,";
        kk += "2,1,1,2,3,2,1,2,1,2,2,2,";
        kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
        kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
        kk += "2,1,2,5,2,1,1,2,1,2,1,2,";
        //2021
        kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
        kk += "2,1,2,1,2,2,1,2,1,2,1,2,";
        kk += "1,5,2,1,2,1,2,2,1,2,1,2,";
        kk += "1,2,1,1,2,1,2,2,1,2,2,1,";
        kk += "2,1,2,1,1,5,2,1,2,2,2,1,";
        kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
        kk += "1,2,1,2,1,1,2,1,1,2,2,2,";
        kk += "1,2,2,1,5,1,2,1,1,2,2,1,";
        kk += "2,2,1,2,2,1,1,2,1,1,2,2,";
        kk += "1,2,1,2,2,1,2,1,2,1,2,1,";
        //2031
        kk += "2,1,5,2,1,2,2,1,2,1,2,1,";
        kk += "2,1,1,2,1,2,2,1,2,2,1,2,";
        kk += "1,2,1,1,2,1,5,2,2,2,1,2,";
        kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
        kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
        kk += "2,2,1,2,1,4,1,1,2,1,2,2,";
        kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
        kk += "2,2,1,2,1,2,1,2,1,1,2,1,";
        kk += "2,2,1,2,5,2,1,2,1,2,1,1,";
        kk += "2,1,2,2,1,2,2,1,2,1,2,1,";
        //2041
        kk += "2,1,1,2,1,2,2,1,2,2,1,2,";
        kk += "1,5,1,2,1,2,1,2,2,2,1,2,";
        kk += "1,2,1,1,2,1,1,2,2,1,2,2";

        var arr = new Array();
        arr = kk.split(",");

        return arr;
    };

    /**
     * 문자열로 들어온 두 날짜 사이에 일수 구하기.
     */
    function getDiffDayCount(str_fromDate, str_toDate) {
        var rtn_count = 0;

//	console.log('str_fromDate', str_fromDate);
//	console.log('str_toDate', str_toDate);

        if(str_fromDate && str_toDate) {

            let fromDate = new Date(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), str_fromDate.substring(6, 8));
            let toDate = new Date(str_toDate.substring(0, 4), (parseInt(str_toDate.substring(4, 6)) - 1), str_toDate.substring(6, 8));

//		console.log('fromDate', fromDate);
//		console.log('toDate', toDate);

//		console.log((toDate.getTime() - fromDate.getTime()) / 1000/ 60 / 60 / 24);
            rtn_count = (toDate.getTime() - fromDate.getTime()) / 1000/ 60 / 60 / 24;
        }

        return rtn_count;
    }

    /**
     * 문자열로 들어온 두 날짜 사이에 년수 구하기.
     */
    function getDiffYearCount(str_fromDate, str_toDate) {
        let rtn_count = 0;

        if(str_fromDate && str_toDate) {
//		console.log('str_fromDate', str_fromDate);
//		console.log('str_toDate', str_toDate);

            let fromDate = new Date(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), str_fromDate.substring(6, 8));
            let toDate = new Date(str_toDate.substring(0, 4), (parseInt(str_toDate.substring(4, 6)) - 1), str_toDate.substring(6, 8));

//		console.log('fromDate', fromDate);
//		console.log('toDate', toDate);

//		console.log((toDate.getTime() - fromDate.getTime()) / 1000/ 60 / 60 / 24 / 365);

            rtn_count = (toDate.getTime() - fromDate.getTime()) / 1000/ 60 / 60 / 24 / 365;
        }

        return rtn_count;
    }

    /**
     * 문자열로 들어온 두 날짜 사이의 월 객체 리스트 구하기.
     */
    function getBetweenMonthList(str_fromDate, str_toDate) {
        let returnArray = [],
            fromDate = null,
            toDate = null,
            id = '',
            name = '',
            calDate = null,
            checkItem = 0;

//	console.log('str_fromDate', str_fromDate);
//	console.log('str_toDate', str_toDate);

//	console.log(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), 1);
//	console.log(str_toDate.substring(0, 4), parseInt(str_toDate.substring(4, 6)), 0);

        fromDate = new Date(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), 1);
        toDate = new Date(str_toDate.substring(0, 4), parseInt(str_toDate.substring(4, 6)), 0);

//	console.log('fromDate', fromDate.format('yyyy-MM-dd'));
//	console.log('toDate', toDate.format('yyyy-MM-dd'));

        while(fromDate <= toDate) {
//		console.log('fromDate', fromDate, fromDate.format('yyyy-MM-dd'));
            calDate = new Date(fromDate.format('yyyy-MM-dd'));

            id = calDate.format('yyyyMM');
            name = calDate.format('yyyy-MM')

            checkItem = 0;
            if(returnArray != null && returnArray.length > 0) {
                for(var i = 0; i < returnArray.length; i += 1) {
                    if(returnArray[i].id == id) {
                        checkItem += 1;
                        break;
                    }
                }
            }

            if(checkItem == 0) {
                returnArray.push({
                    id: calDate.format('yyyyMM'),
                    name: calDate.format('yyyy-MM')
                });
            }
            fromDate.setDate(fromDate.getDate() + 1);
        }

        return returnArray;
    }

    /**
     * 문자열로 들어온 두 날짜 사이의 주 객체 리스트 구하기.
     */

    function getBetweenWeekList(str_fromDate, str_toDate) {
        var returnArray = [],
            firstDayOfMonth = null,
            fromDate = null,
            toDate = null,
            id = '',
            name = '',
            calDate = null,
            checkItem = 0;

        firstDayOfMonth = new Date(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), '01');

        fromDate = new Date(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), str_fromDate.substring(6, 8));
        toDate = new Date(str_toDate.substring(0, 4), (parseInt(str_toDate.substring(4, 6)) - 1), str_toDate.substring(6, 8));

//	console.log('firstDayOfMonth: ', firstDayOfMonth);
//	console.log('firstDayOfMonth getDay(): ', firstDayOfMonth.getDay());
//	console.log('fromDate getDate(): ', fromDate.getDate());
//	console.log('weekofmonth: ', Math.ceil((fromDate.getDate() + firstDayOfMonth.getDay()) / 7));

        while(fromDate <= toDate) {
            calDate = new Date(fromDate.format('yyyy-MM-dd'));
            id = calDate.format('yyyyMM') + Math.ceil((calDate.getDate() + firstDayOfMonth.getDay()) / 7);
            name = calDate.format('yyyy-MM') + ' ' + Math.ceil((calDate.getDate() + firstDayOfMonth.getDay()) / 7) + 'W';

//		console.log('fromDate', fromDate, fromDate.format('yyyy-MM-dd'));
//		console.log('id', id);
//		console.log('name', name);

            checkItem = 0;
            if(returnArray != null && returnArray.length > 0) {
                for(var i = 0; i < returnArray.length; i += 1) {
                    if(returnArray[i].id == id) {
                        checkItem += 1;
                        break;
                    }
                }
            }

            if(checkItem == 0) {
                returnArray.push({
                    id: id,
                    name: name
                });
            }

            fromDate.setDate(fromDate.getDate() + 1);
        }


        return returnArray;
    }

    /**
     * 문자열로 들어온 두 날짜 사이의 날짜 객체 리스트 구하기.
     */
    function getBetweenDateList(str_fromDate, str_toDate) {
        let returnArray = [],
            fromDate = null,
            toDate = null,
            calDate = null,
            checkItem = 0;

//	console.log('str_fromDate', str_fromDate);
//	console.log('str_toDate', str_toDate);

        fromDate = new Date(str_fromDate.substring(0, 4), (parseInt(str_fromDate.substring(4, 6)) - 1), str_fromDate.substring(6, 8));
        toDate = new Date(str_toDate.substring(0, 4), (parseInt(str_toDate.substring(4, 6)) - 1), str_toDate.substring(6, 8));

//	console.log('fromDate', fromDate);
//	console.log('toDate', toDate);

        while(fromDate <= toDate) {
//		console.log('fromDate', fromDate, fromDate.format('yyyy-MM-dd'));
            calDate = new Date(fromDate.format('yyyy-MM-dd'));

            checkItem = 0;
            if(returnArray != null && returnArray.length > 0) {
                for(var i = 0; i < returnArray.length; i += 1) {
                    if(returnArray[i].id == calDate.format('yyyyMMdd')) {
                        checkItem += 1;
                        break;
                    }
                }
            }

            if(checkItem == 0) {
                returnArray.push({
                    id: calDate.format('yyyyMMdd'),
                    name: calDate.format('yyyy-MM-dd')
                });
            }
            fromDate.setDate(fromDate.getDate() + 1);
        }

        return returnArray;
    }
});