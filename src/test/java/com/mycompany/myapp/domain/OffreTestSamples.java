package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class OffreTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Offre getOffreSample1() {
        return new Offre()
            .id(1L)
            .title("title1")
            .company("company1")
            .location("location1")
            .salary("salary1")
            .skills("skills1")
            .experienceLevel("experienceLevel1");
    }

    public static Offre getOffreSample2() {
        return new Offre()
            .id(2L)
            .title("title2")
            .company("company2")
            .location("location2")
            .salary("salary2")
            .skills("skills2")
            .experienceLevel("experienceLevel2");
    }

    public static Offre getOffreRandomSampleGenerator() {
        return new Offre()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .company(UUID.randomUUID().toString())
            .location(UUID.randomUUID().toString())
            .salary(UUID.randomUUID().toString())
            .skills(UUID.randomUUID().toString())
            .experienceLevel(UUID.randomUUID().toString());
    }
}
