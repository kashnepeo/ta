package com.diquest.ta.call.repository;

import com.diquest.ta.call.model.CallEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CallRepository extends JpaRepository<CallEntity, String> {

    List<CallEntity> findByYyyymmdd(String yyyymmdd, Pageable pageable);
    Page<CallEntity>findByYyyymmddContaining(String yyyymmdd, Pageable pageable);

}