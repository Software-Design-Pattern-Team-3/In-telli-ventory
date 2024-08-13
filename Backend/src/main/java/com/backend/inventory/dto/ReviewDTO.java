package com.backend.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {

    private Long reviewId;
    private Long productId;
    private Long userId;
    private String reviewText;
    private Date reviewDate;
    private double sentimentScore;

}
