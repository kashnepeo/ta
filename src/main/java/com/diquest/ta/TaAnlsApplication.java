package com.diquest.ta;

import com.diquest.ta.call.model.REC_CALL_INFO;
import com.diquest.ta.call.repository.CallRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TaAnlsApplication {
    private static final Logger log = LoggerFactory.getLogger(TaAnlsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(TaAnlsApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(CallRepository repository) {
        return (args) -> {
            // callInfo
            for (REC_CALL_INFO callInfo : repository.findByYyyymmdd("20200520")) {
//                log.info(callInfo.getRFileNm());
            }
            log.info("");
        };
    }
}
