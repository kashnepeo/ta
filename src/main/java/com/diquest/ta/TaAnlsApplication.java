package com.diquest.ta;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaAnlsApplication {
    private static final Logger log = LoggerFactory.getLogger(TaAnlsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(TaAnlsApplication.class, args);
    }
}
