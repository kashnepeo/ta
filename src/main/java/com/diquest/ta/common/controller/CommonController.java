package com.diquest.ta.common.controller;

import java.util.*;

import javax.annotation.Resource;

import com.diquest.ta.common.constant.CommonConstants;
import com.diquest.ta.common.model.CodeEntity;
import com.diquest.ta.common.repository.CodeRepository;
import com.diquest.ta.common.util.AppUtil;
import com.diquest.ta.common.util.CodeManagerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/common")
public class CommonController {

    private final Logger LOG = LoggerFactory.getLogger(CommonController.class);

    @Resource(name = "messageSource")
    private MessageSource messageSource;

    private CodeRepository codeRepository = new CodeRepository();
    @PostMapping(value = "/retrieveCommonCodeList.do")
    public String retrieveCommonCodeList(Model model) {
        boolean status = true;
        StopWatch stopWatch = new StopWatch();

        String resultCode = CommonConstants.RESULT_CODE0.getValue();
        String resultMessage = CommonConstants.RESULT_MESSAGE0.getValue();

        List<CodeEntity> codeList = null;
        Map<String, LinkedHashMap<String, String>> list = new HashMap<String, LinkedHashMap<String, String>>();
        if (status) {
            try {
                stopWatch.start();

                codeList = new ArrayList<CodeEntity>();

                // 조회구분
                String[][] dateTypeArray = CodeManagerUtil._dateTypeArray;
                for (String[] eachCodeArray : dateTypeArray) {
                    codeList.add(codeRepository.codeSetting(eachCodeArray));
                }

                // 센터
                String[][] centerTypeArray = CodeManagerUtil._centerTypeArray;
                for (String[] eachCodeArray : centerTypeArray) {
                    codeList.add(codeRepository.codeSetting(eachCodeArray));
                }

                // 상담 시간
                String[][] timeTypeArray = CodeManagerUtil._timeTypeArray;
                for (String[] eachCodeArray : timeTypeArray) {
                    codeList.add(codeRepository.codeSetting(eachCodeArray));
                }

                // 통화 길이
                String[][] durationTypeArray = CodeManagerUtil._durationTypeArray;
                for (String[] eachCodeArray : durationTypeArray) {
                    codeList.add(codeRepository.codeSetting(eachCodeArray));
                }

                model.addAttribute("codeList", codeList);
                model.addAttribute(CommonConstants.RESULT_CODE_NAME, resultCode);
                model.addAttribute(CommonConstants.RESULT_MESSAGE_NAME, resultMessage);
            } catch (Exception e) {
                resultCode = CommonConstants.RESULT_CODE1.getValue();
                resultMessage = this.messageSource.getMessage("fail.common.msg", null, Locale.KOREA);

                LOG.error(AppUtil.setErrLogFormat("retrieveCommonCodeList", resultCode, resultMessage, e.getMessage()));
                LOG.error(e.getMessage());
                status = false;
            } finally {
                stopWatch.stop();
                LOG.info(AppUtil.setInfoLogFormat("retrieveCommonCodeList", resultCode, resultMessage, stopWatch.getTotalTimeMillis()));
            }
        }


        return "fragments/common/search_condition::#search_condition";
    }

//    @RequestMapping(value = "/common/insertTrace.do")
//    public @ResponseBody Object insertTrace(
//            @RequestParam HashMap<String, Object> map,
//            ModelMap model,
//            HttpServletRequest request,
//            HttpServletResponse response) {
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        boolean status = true;
//        StopWatch stopWatch = new StopWatch();
//
//        String resultCode = CommonConstants.RESULT_CODE.SUCCESS_CODE;
//        String resultMessage = "";
//
//        if (status) {
//            try {
//                stopWatch.start();
//
//                result.put("list", CodeManager.getInstance().getCodeResource());
//
//            } catch (NullPointerException e) {
//
//                // 실패 결과 코드 설정
//                resultCode = CommonConstants.RESULT_CODE.FAIL_CODE;
//                resultMessage = this.messageSource.getMessage("fail.common.msg", null, request.getLocale());
//
//                this.LOG.error(AppUtil.setErrLogFormat("retrieveCommonCodeList", resultCode, resultMessage, e.getMessage()));
//                this.LOG.error(e.getMessage());
//                status = false;
//            } catch (Exception e) {
//
//                // 실패 결과 코드 설정
//                resultCode = CommonConstants.RESULT_CODE.FAIL_CODE;
//                resultMessage = this.messageSource.getMessage("fail.common.msg", null, request.getLocale());
//
//                this.LOG.error(AppUtil.setErrLogFormat("retrieveCommonCodeList", resultCode, resultMessage, e.getMessage()));
//                this.LOG.error(e.getMessage());
//                status = false;
//            } finally {
//                stopWatch.stop();
//                this.LOG.info(AppUtil.setInfoLogFormat("retrieveCommonCodeList", resultCode, resultMessage, stopWatch.getLastTaskTimeMillis()));
//            }
//        }
//
//        result.put(CommonConstants.RESULT_CODE_NAME, resultCode);
//        result.put(CommonConstants.RESULT_MESSAGE_NAME, resultMessage);
//
//        return result;
//    }
//
//    /**
//     * @MethodName : toNumFormat
//     * @date : 2018. 3. 16.
//     * @author : caf000
//     * @description : 숫자 콤마기능
//     * @history :
//     *	-----------------------------------------------------------------------
//     *	변경일				작성자						변경내용
//     *	----------- ------------------- ---------------------------------------
//     *	2018. 3. 16.		caf000				최초 작성
//     *	-----------------------------------------------------------------------
//     *
//     * @param num
//     * @return
//     */
//    public static String toNumFormat(int num) {
//        DecimalFormat df = new DecimalFormat("#,###");
//        return df.format(num);
//    }
//
//    /**
//     * @MethodName : toTimeFormat
//     * @date : 2018. 3. 16.
//     * @author : caf000
//     * @description : 정수를 시간 단위로 변환
//     * @history :
//     *	-----------------------------------------------------------------------
//     *	변경일				작성자						변경내용
//     *	----------- ------------------- ---------------------------------------
//     *	2018. 3. 16.		caf000				최초 작성
//     *	-----------------------------------------------------------------------
//     *
//     * @param num
//     * @return
//     */
//    public static String toTimeFormat(String numStr) {
//        int num = 0;
//        try{
//            num = Integer.parseInt(numStr);
//
//        }
//        catch(NumberFormatException e1){
//            e1.printStackTrace();
//            return numStr;
//        }
//        double hours = Math.floor(num / 3600);
//        double minute = Math.floor( (num % 3600) / 60);
//        double second = Math.floor(num % 3600 % 60);
//        String hourStr = String.format("%.0f", hours);
//        String minuteStr = String.format("%.0f", minute);
//        String secondStr = String.format("%.0f", second);
//
//        if(hourStr.length() == 1){
//            hourStr = "0" + hourStr;
//        }
//        if(minuteStr.length() == 1){
//            minuteStr = "0" + minuteStr;
//        }
//        if(secondStr.length() == 1){
//            secondStr = "0" + secondStr;
//        }
//
//        return hourStr + ":" + minuteStr + ":" + secondStr;
//    }
//
//    /**
//     * @MethodName : toDateFormat
//     * @date : 2018. 3. 16.
//     * @author : caf000
//     * @description : 날짜값의 String 을 입력받아 출력 포멧을 반환
//     * @history :
//     *	-----------------------------------------------------------------------
//     *	변경일				작성자						변경내용
//     *	----------- ------------------- ---------------------------------------
//     *	2018. 3. 16.		caf000				최초 작성
//     *	-----------------------------------------------------------------------
//     *
//     * @param num
//     * @return
//     */
//    public static String toDateFormat(String dateStr) {
//        String returnStr = "";
//        if(dateStr.length() == 14){
//            returnStr = dateStr.substring(0, 4) + "/" + dateStr.substring(4, 6) + "/" + dateStr.substring(6, 8)
//                    +" " + dateStr.substring(8, 10) + ":" + dateStr.substring(10, 12) + ":" + dateStr.substring(12, 14);
//        }
//        else{
//            returnStr = dateStr;
//        }
//        return returnStr;
//    }
//
//    /**
//     * @MethodName : viewTrace
//     * @date : 2018. 4. 19.
//     * @author : caf000
//     * @description : 트레이스 화면 이동
//     * @history :
//     *	-----------------------------------------------------------------------
//     *	변경일				작성자						변경내용
//     *	----------- ------------------- ---------------------------------------
//     *	2018. 4. 19.		caf000				최초 작성
//     *	-----------------------------------------------------------------------
//     *
//     * @param request
//     * @param response
//     * @param model
//     * @return
//     */
//    @RequestMapping(value = "/ras/sysadm/viewTrace.do")
//    public String viewTrace(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
//
//        return "/sysadm/trace";
//    }
//
//    /**
//     * @MethodName : getListTrace
//     * @date : 2018. 4. 19.
//     * @author : caf000
//     * @description : 트레이스 조회 처리
//     * @history :
//     *	-----------------------------------------------------------------------
//     *	변경일				작성자						변경내용
//     *	----------- ------------------- ---------------------------------------
//     *	2018. 4. 19.		caf000				최초 작성
//     *	-----------------------------------------------------------------------
//     *
//     * @param traceVO
//     * @param model
//     * @param request
//     * @param response
//     * @return
//     */
//    @RequestMapping(value = "/ras/sysadm/getListTrace.do")
//    public @ResponseBody Object getListTrace(
//            @RequestParam Map<String, Object> paramMap,
//            ModelMap model,
//            HttpServletRequest request,
//            HttpServletResponse response) {
//
//        LOG.debug("method : getListTrace");
//        LOG.debug("getDatetimepicker1 :" + paramMap.get("datetimepicker1"));
//        LOG.debug("getDatetimepicker2 :" + paramMap.get("datetimepicker2"));
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//		/*boolean status = true;
//		StopWatch stopWatch = new StopWatch();
//
//		String resultCode = CommonConstants.RESULT_CODE.SUCCESS_CODE;
//		String resultMessage = "";
//
//		if (status) {
//			try {
//				stopWatch.start();
//
//				traceVO.setDateType("DAY");
//				traceVO.setDatetimepicker1(DateUtil.convertDateFormat(traceVO.getDateType(), traceVO.getDatetimepicker1(), "start"));
//				traceVO.setDatetimepicker2(DateUtil.convertDateFormat(traceVO.getDateType(), traceVO.getDatetimepicker2(), "end"));
//
//				List<TraceVO> rows = commonService.getListTrace(traceVO);
//
//				for(TraceVO vo : rows) {
//					if(vo.getTypeCd().equals("S")) { vo.setTypeCd("서울"); }
//					else if(vo.getTypeCd().equals("D")) { vo.setTypeCd("대전"); }
//					else if(vo.getTypeCd().equals("M")) { vo.setTypeCd("드라마"); }
//					else if(vo.getTypeCd().equals("R")) { vo.setTypeCd("재색인"); }
//
//					if(vo.getStateCd().equals("S")) { vo.setStateCd("시작"); }
//					else if(vo.getStateCd().equals("R")) { vo.setStateCd("대기"); }
//					else if(vo.getStateCd().equals("E")) { vo.setStateCd("종료"); }
//					else if(vo.getStateCd().equals("F")) { vo.setStateCd("실패"); }
//
//					vo.setBatchDt(vo.getBatchDt().substring(0, 4) + "-" + vo.getBatchDt().substring(4, 6) + "-" + vo.getBatchDt().substring(6, 8) + " " + vo.getBatchDt().substring(8, 10) + ":" + vo.getBatchDt().substring(10, 12) + ":" + vo.getBatchDt().substring(12, 14));
//				}
//
//				result.put("rows", rows);
//
//			} catch (NullPointerException e) {
//
//				// 실패 결과 코드 설정
//				resultCode = CommonConstants.RESULT_CODE.FAIL_CODE;
//				resultMessage = this.messageSource.getMessage("fail.common.msg", null, request.getLocale());
//
//				this.LOG.error(AppUtil.setErrLogFormat("getListTrace", resultCode, resultMessage,e.getMessage()));
//				this.LOG.error(e.getMessage());
//				status = false;
//			} catch (Exception e) {
//
//				// 실패 결과 코드 설정
//				resultCode = CommonConstants.RESULT_CODE.FAIL_CODE;
//				resultMessage = this.messageSource.getMessage("fail.common.msg", null, request.getLocale());
//
//				this.LOG.error(AppUtil.setErrLogFormat("getListTrace", resultCode, resultMessage,e.getMessage()));
//				this.LOG.error(e.getMessage());
//				status = false;
//			} finally {
//				stopWatch.stop();
//				this.LOG.info(AppUtil.setInfoLogFormat("getListTrace", resultCode, resultMessage, stopWatch.getTotalTimeMillis()));
//			}
//		}
//
//		result.put(CommonConstants.RESULT_CODE_NAME, resultCode);
//		result.put(CommonConstants.RESULT_MESSAGE_NAME, resultMessage);*/
//
//        return result;
//    }
}

