package com.backend.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.inventory.repository.ReviewRepository;
import com.backend.inventory.dto.ReviewDTO;
import com.backend.inventory.model.Review;
import com.backend.inventory.model.Sale;


@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, ReviewDTO reviewDTO) {
        Review existingReview = reviewRepository.findById(id).orElse(null);
        if (existingReview != null) {
            existingReview.setReviewText(reviewDTO.getReviewText());
            existingReview.setReviewDate(reviewDTO.getReviewDate());
            existingReview.setSentimentScore(reviewDTO.getSentimentScore());
            return reviewRepository.save(existingReview);
        }
        return null;
    }

    public String deleteReview(Long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        if (review != null) {
            reviewRepository.deleteById(id);
            return "Review deleted with ID: " + id;
        }
        return "Review not found";
    }
}
