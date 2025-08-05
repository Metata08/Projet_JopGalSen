package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class OffreTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Offre getOffreSample1() {
        return new Offre()
            .id(1L)
            .titre("titre1")
            .entreprise("entreprise1")
            .localite("localite1")
            .categorie("categorie1")
            .experience("experience1")
            .exigences("exigences1")
            .benefice("benefice1")
            .remuneration(1);
    }

    public static Offre getOffreSample2() {
        return new Offre()
            .id(2L)
            .titre("titre2")
            .entreprise("entreprise2")
            .localite("localite2")
            .categorie("categorie2")
            .experience("experience2")
            .exigences("exigences2")
            .benefice("benefice2")
            .remuneration(2);
    }

    public static Offre getOffreRandomSampleGenerator() {
        return new Offre()
            .id(longCount.incrementAndGet())
            .titre(UUID.randomUUID().toString())
            .entreprise(UUID.randomUUID().toString())
            .localite(UUID.randomUUID().toString())
            .categorie(UUID.randomUUID().toString())
            .experience(UUID.randomUUID().toString())
            .exigences(UUID.randomUUID().toString())
            .benefice(UUID.randomUUID().toString())
            .remuneration(intCount.incrementAndGet());
    }
}
