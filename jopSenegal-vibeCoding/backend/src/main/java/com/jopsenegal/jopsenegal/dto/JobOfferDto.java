package com.jopsenegal.jopsenegal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobOfferDto {

    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    private LocalDateTime createdAt;
    @NotBlank
    private String contractTypeName;
    @NotBlank
    private String jobTypeName;
    @NotBlank
    private String profileSearched;
    @NotBlank
    private String locationName;
    private String recruiterCompanyName;
    @NotNull
    private Long recruiterId;

}
