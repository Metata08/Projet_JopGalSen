package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UsersTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Users getUsersSample1() {
        return new Users().id(1L).email("email1").password("password1").name("name1").telephone("telephone1").entreprise("entreprise1");
    }

    public static Users getUsersSample2() {
        return new Users().id(2L).email("email2").password("password2").name("name2").telephone("telephone2").entreprise("entreprise2");
    }

    public static Users getUsersRandomSampleGenerator() {
        return new Users()
            .id(longCount.incrementAndGet())
            .email(UUID.randomUUID().toString())
            .password(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .telephone(UUID.randomUUID().toString())
            .entreprise(UUID.randomUUID().toString());
    }
}
