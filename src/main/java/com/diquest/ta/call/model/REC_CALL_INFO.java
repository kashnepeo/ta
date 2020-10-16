package com.diquest.ta.call.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity(name="rec_call_info")
@Table(name="rec_call_info")
public class REC_CALL_INFO {
    @Id
    @Column(name="r_file_nm")
    private String rFileNm;

    @Column(name="yyyymmdd")
    private String yyyymmdd;

    @Column(name="r_usr_id")
    private String rUsrId;

    @Column(name="r_usr_nm")
    private String rUsrNm;
}
