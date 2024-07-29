package com.backend.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.inventory.model.Product;
import com.backend.inventory.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> addProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    public List<Product> getProducts() {
        
        return productRepository.findAll();
    }

   
    public List<Product> getProductsByFilter(String category, String subcategory, String brand, String type) {
        if (category != null) {
            return productRepository.findByCategory(category);
        } else if (subcategory != null) {
            return productRepository.findBySubcategory(subcategory);
        } else if (brand != null) {
            return productRepository.findByBrand(brand);
        } else if (type != null) {
            return productRepository.findByType(type);
        } else {
            return productRepository.findAll();
        }
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

  
    
    



}
