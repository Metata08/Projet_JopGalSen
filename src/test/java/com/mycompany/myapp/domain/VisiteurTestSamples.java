package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class VisiteurTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Visiteur getVisiteurSample1() {
        return new Visiteur().id(1L).cv("cv1");
    }

    public static Visiteur getVisiteurSample2() {
        return new Visiteur().id(2L).cv("cv2");
    }

    public static Visiteur getVisiteurRandomSampleGenerator() {
        return new Visiteur().id(longCount.incrementAndGet()).cv(UUID.randomUUID().toString());
    }
}
