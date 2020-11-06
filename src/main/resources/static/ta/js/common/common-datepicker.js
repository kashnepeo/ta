$(function () {
        'use strict';

        /**
         * 날짜 가져오기
         * _type : 조회 구분(dateType)
         * _addNum : 날짜 변수
         */
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

            if (arguments.length > 2) {
                _year = _compDate.substr(0, 4);
                _month = isEmpty(_compDate.substr(4, 2), '01');
                _day = isEmpty(_compDate.substr(6, 2), '01');
                _hour = isEmpty(_compDate.substr(8, 2), '');
                _minute = isEmpty(_compDate.substr(10, 2), '');
                _seconds = isEmpty(_compDate.substr(12, 2), '');
                _nowDate = new Date(Date.parse(_year + '/' + _month + '/' + _day + ' ' + _hour + ':' + _minute + ':' + _seconds));
            } else {
                _nowDate = new Date();
            }

            if (_type === 'MONTH') {
                _minusDate = new Date(_nowDate.getFullYear(), _nowDate.getMonth() + (_addNum), _nowDate.getDate());
            } else if (_type === 'YEAR') {
                _minusDate = new Date(_nowDate.getFullYear() + (_addNum), _nowDate.getMonth(), _nowDate.getDate());
            } else {
                if (_type === 'DAY') {
                    _minusMilliseconds = _addNum * 24 * 60 * 60 * 1000;
                } else if (_type === 'HOUR') {
                    _minusMilliseconds = _addNum * 60 * 60 * 1000;
                } else if (_type === 'WEEK') {
                    _minusMilliseconds = _addNum * 7 * 24 * 60 * 60 * 1000;
//		} else if(_type == 'YEAR') {
//			_minusMilliseconds = _addNum*365*24*60*60*1000;
                } else { // 기본 day
                    _minusMilliseconds = _addNum * 7 * 24 * 60 * 60 * 1000;
                }
                _minusDate = new Date(Date.parse(_nowDate) + (_minusMilliseconds));
            }

            _year = _minusDate.getFullYear();
            _month = _minusDate.getMonth() + 1;
            _month = _month.toString().length === 1 ? '0' + _month : _month;
            _day = _minusDate.getDate();
            _day = _day.toString().length === 1 ? '0' + _day : _day;
            _hour = _minusDate.getHours();
            _hour = _hour.toString().length === 1 ? '0' + _hour : _hour;
            _minute = _minusDate.getMinutes();
            _minute = _minute.toString().length === 1 ? '0' + _minute : _minute;
            _seconds = _minusDate.getSeconds();
            _seconds = _seconds.toString().length === 1 ? '0' + _seconds : _seconds;
            return '' + _year + _month + _day + _hour + _minute + _seconds;
        };

        /**
         * dateFormatter : 날짜양식변경
         * _yyyyMMdd : yyyyMMdd형태의 날짜 데이터(yyyyMMddhhmmss)형태까지 변환가능
         * _seperator : 날짜양식(예: yyyy-MM-dd hh:mm:ss)
         */
        function dateFormatter(_yyyyMMdd, _seperator) {
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

            // console.log('_seperator > ', _seperator);
            return _seperator;
        };

        /**
         * fnDatePicker : datepicker 공통함수
         * _obj : datepicker를 만들 요소 id
         * _option : datepicker 옵션
         * _type : dateType (예 : day, week, month, year)
         * _addNum : 추가할 날짜 (양수, 음수 둘 다 가능)
         * _seperator : 날짜양식(예: yyyy-MM-dd hh:mm:ss)
         */
        function fnDatePicker(_obj, _option, _type, _addNum, _seperator) {
            let year = dateFormatter(getDate('DAY', _addNum).substring(0, 8), _seperator.replace('-', '')).substring(0, 4);
            let month = dateFormatter(getDate('DAY', _addNum).substring(0, 8), _seperator.replace('-', '')).substring(4, 6);
            let date = dateFormatter(getDate('DAY', _addNum).substring(0, 8), _seperator.replace('-', '')).substring(6);
            let value = dateFormatter(getDate('DAY', _addNum).substring(0, 8), _seperator);
            let firstDate = moment(value, "YYYY-MM-DD").day(0).format("YYYY-MM-DD");
            $(_obj).datepicker('destroy').datepicker(_option);
            $(_obj + ' > input').val(dateFormatter(getDate(_type.toUpperCase().replace('s', ''), _addNum).substring(0, 8), _seperator));
        }

        /**
         * 조회구분 dropdown 변경할 때마다 datepicker startView 변경
         */
        $(document).on('change', '#dateType', function () {
            if ($(this).val()) {
                let _dateType = $('#dateType').val().toLowerCase();
                if ($(this).val() === 'MONTH') {
                    let _option = {
                        format: "yyyy-mm", // 데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
                        autoclose: true, // 날짜 클릭시 캘린더가 자동으로 닫힘
                        startView: 1, // 달력에 표시되는 형태 (0 : days, 1 : months, 2 : years, 3 : decades)
                        minViewMode: 1, // 달력에 표시되는 최소 형태 (0 : days, 1 : months, 2 : years, 3 : decades)
                    };
                    let _seperator = 'yyyy-MM';
                    fnDatePicker('#startDate', _option, _dateType, -1, _seperator);
                    fnDatePicker('#endDate', _option, _dateType, 0, _seperator);
                } else if ($(this).val() === 'WEEK') {
                    let _option = {
                        format: 'yyyy-mm-dd',
                        autoclose: true,
                        startView: 0,
                        minViewMode: 0,
                    };
                    let _seperator = 'yyyy-MM-dd';
                    fnDatePicker('#startDate', _option, _dateType, -4, _seperator);
                    fnDatePicker('#endDate', _option, _dateType, 0, _seperator);
                } else if ($(this).val() === 'DAY') {
                    let _option = {
                        format: 'yyyy-mm-dd',
                        autoclose: true,
                        startView: 0,
                        minViewMode: 0,
                    };
                    let _seperator = 'yyyy-MM-dd';
                    fnDatePicker('#startDate', _option, _dateType, -30, _seperator);
                    fnDatePicker('#endDate', _option, _dateType, 0, _seperator);
                }
            }
        });

        /**
         * 조회 구분이 주별일 경우 datepicker 클릭 시  background 색상 변경
         */
        $(document).on('click', "#startDate", function () {
            if ($("#dateType").val() === 'WEEK') {
                $(".datepicker-days .table-condensed tr").hover(function () {
                    $(this).css("background-color", "#808080");
                }, function () {
                    $(this).css("background-color", "#fff");
                });
            }
        });
        $(document).on('click', "#endDate", function () {
            if ($("#dateType").val() === 'WEEK') {
                $(".datepicker-days .table-condensed tr").hover(function () {
                    $(this).css("background-color", "#808080");
                }, function () {
                    $(this).css("background-color", "#fff");
                });
            }
        });

        /**
         * 조회 구분이 주별일 경우 datepicker 날짜 선택 시
         * startDate : 주(WEEK)의 첫번째 날짜 반환
         * endDate :  주(WEEK)의 마지막 날짜 반환
         */
        $(document).on('change', "#startDate > input", function (e) {
            if ($("#dateType").val() === 'WEEK') {
                let value = $("#startDate > input").val();
                let firstDate = moment(value, "YYYY-MM-DD").day(0).format("YYYY-MM-DD");
                console.log($('#startDate').data('datepicker'));
                $('#startDate').datepicker('setDate', firstDate);
            }
        });

        $(document).on('change', "#endDate > input", function (e) {
            if ($("#dateType").val() === 'WEEK') {
                let value = $("#endDate > input").val();
                let lastDate = moment(value, "YYYY-MM-DD").day(6).format("YYYY-MM-DD");
                console.log($('#endDate').data('datepicker'));
                $('#endDate').datepicker('setDate', lastDate);
            }
        });

    function validateSearchCondition() {
/**
        var callTimeExp = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/; // 통화시간
        if($('#callTime').length > 0) {
            if(!callTimeExp.test($("#callTime").val())) {
                alert("입력한 통화시간이 올바르지 않습니다.");
                return true;
            }
        }
**/
        let rtn = false,
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
            // dateType = $('#dateType').val();
            startDate = $('#startDate > input').val().replace(/[-| ]/img,'');
            endDate = $('#endDate > input').val().replace(/[-| ]/img,'');

            if(Number(startDate) > Number(endDate)) {
                alert("시작날짜가 종료날짜보다 큽니다.");
                return true;
            }

            // var monthExp = /^(20)([0-9]{2})-([0-9]{2})$/; // 월별
            // var dayExp = /^(20)([0-9]{2})-([0-9]{2})-([0-9]{2})$/; // 일별
            // var hourExp = /^(20)([0-9]{2})-([0-9]{2})-([0-9]{2}) ([0-9]{2})$/; // 시별
            //
            // if(dateType == 'DAY') {
            //     if(!dayExp.test($('#datetimepicker1 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     if(!dayExp.test($('#datetimepicker2 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     validateDateFormat = 'yyyy-MM-dd';
            //     validateMaxNum = Common.Constants.valiateMaxDay;
            //     alertMessage = '일별 검색 최대 검색 기간은 '+(Common.Constants.valiateMaxDay+1)+'일 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            // } else if(dateType == 'HOUR') {
            //     if(!hourExp.test($('#datetimepicker1 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     if(!hourExp.test($('#datetimepicker2 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     validateDateFormat = 'yyyy-MM-dd hh';
            //     validateMaxNum = Common.Constants.valiateMaxHour;
            //     alertMessage = '시간별 검색 최대 검색 기간은 '+Common.Constants.valiateMaxHour+'시간 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            // } else if(dateType == 'MON') {
            //     if(!monthExp.test($('#datetimepicker1 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     if(!monthExp.test($('#datetimepicker2 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     validateDateFormat = 'yyyy-MM';
            //     validateMaxNum = Common.Constants.valiateMaxMonth;
            //     alertMessage = '월별 검색시 최대 검색 기간은 '+Common.Constants.valiateMaxMonth+'개월 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            //     addDate = '01';
            // } else if(dateType == 'WEEK') {
            //     if(!dayExp.test($('#datetimepicker1 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     if(!dayExp.test($('#datetimepicker2 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     validateDateFormat = 'yyyy-MM-dd';
            //     validateMaxNum = Common.Constants.valiateMaxWeek;
            //     alertMessage = '주별 검색시 최대 검색 기간은 '+Common.Constants.valiateMaxWeek+'주 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            //     dateType = 'DAYOFWEEK';
            // } else { // 기본 day
            //     if(!dayExp.test($('#datetimepicker1 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     if(!dayExp.test($('#datetimepicker2 > input').val())) {
            //         alert("입력한 날짜가 올바르지 않습니다.");
            //         return true;
            //     }
            //     validateDateFormat = 'yyyy-MM-dd';
            //     validateMaxNum = Common.Constants.valiateMaxDay;
            //     alertMessage = '일별 검색 최대 검색 기간은 '+Common.Constants.valiateMaxDay+'일 입니다.\n확인버튼을 누르시면 검색종료일이 최대값으로 변경 후 검색 됩니다.\n계속 진행 하시겠습니까?';
            // }

            // if(!Common.Date.checkMaxDate(dateType, datetimepicker1, datetimepicker2, validateMaxNum)) {
            //     if( confirm(alertMessage) ) {
            //         // datetimepicker1 에 최대값 적용
            //         $('#datetimepicker1').data("DateTimePicker").date($('#datetimepicker1 > input').val());
            //         $('#datetimepicker2 > input').val(Common.Format.date(Common.Date.getDate(dateType, validateMaxNum, datetimepicker1) + addDate, validateDateFormat));
            //         $('#datetimepicker2').data("DateTimePicker").date($('#datetimepicker2 > input').val());
            //         rtn = false;
            //     } else {
            //         rtn = true;
            //     }
            // }
        }
        return rtn;
    }
    }
);