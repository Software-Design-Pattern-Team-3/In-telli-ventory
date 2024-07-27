package com.backend.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.inventory.model.Product;

import jakarta.transaction.Transactional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategory(String category);
    List<Product> findBySubcategory(String subCategory);
    List<Product> findByBrand(String brand);
    List<Product> findByType(String type);


}
