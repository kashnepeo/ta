package com.diquest.common.util;

public class AppUtil {
    public static String setErrLogFormat(String name, String resultCode, String resultMessage, String exceptionMessage) {
        return String.format("[TA_ERROR] [%s] CODE:[%s] MESSAGE:[%s] [%s]", name, resultCode, resultMessage, exceptionMessage);
    }

    public static String setInfoLogFormat(String name, String resultCode, String resultMessage, long millis) {
        return String.format("[TA_INFO] [%s] CODE:[%s] MESSAGE:[%s] [%s ms]", name, resultCode, resultMessage, millis);
    }
}
