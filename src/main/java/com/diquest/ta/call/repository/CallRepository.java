package com.diquest.ta.call.repository;

import com.diquest.ta.call.model.REC_CALL_INFO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CallRepository extends JpaRepository<REC_CALL_INFO, String> {

    List<REC_CALL_INFO> findByYyyymmdd(String yyyymmdd);

}