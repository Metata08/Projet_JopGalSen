package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.DomaineAsserts.*;
import static com.mycompany.myapp.domain.DomaineTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DomaineMapperTest {

    private DomaineMapper domaineMapper;

    @BeforeEach
    void setUp() {
        domaineMapper = new DomaineMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDomaineSample1();
        var actual = domaineMapper.toEntity(domaineMapper.toDto(expected));
        assertDomaineAllPropertiesEquals(expected, actual);
    }
}
