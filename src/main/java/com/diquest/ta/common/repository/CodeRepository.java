package com.diquest.ta.common.repository;

import com.diquest.ta.common.model.CodeEntity;

public class CodeRepository {
    public CodeEntity codeSetting(String[] eachCodeArray) {
        CodeEntity codeEntity = new CodeEntity();
        codeEntity.setGroupCode(eachCodeArray[0]);
        codeEntity.setCode(eachCodeArray[1]);
        codeEntity.setName(eachCodeArray[2]);
        return codeEntity;
    }
}
