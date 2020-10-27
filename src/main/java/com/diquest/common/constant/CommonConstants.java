package com.diquest.common.constant;

public enum CommonConstants {
    RESULT_CODE0("000"),
    RESULT_CODE1("900"),
    RESULT_CODE2("910"),
    RESULT_CODE3("920"),
    RESULT_CODE4("930"),
    RESULT_CODE5("940"),
    RESULT_CODE6("950"),

    RESULT_MESSAGE0("Success"),
    RESULT_MESSAGE1("Fail"),
    RESULT_MESSAGE2("Api Error"),
    RESULT_MESSAGE3("DB Error"),
    RESULT_MESSAGE4("Session Timeout"),
    RESULT_MESSAGE5("Exception Default"),
    RESULT_MESSAGE6("Unkown Error");

    private final String value;

    CommonConstants(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static final String RESULT_CODE_NAME = "resultCode";
    public static final String RESULT_MESSAGE_NAME = "resultMessage";

}
