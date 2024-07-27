package com.backend.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.inventory.service.ProductService;
import com.backend.inventory.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.backend.inventory.exception.EmailAlreadyRegisteredException;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<List<Product>> addProducts(@RequestBody List<Product> products) {

        try {
            List<Product> pro = productService.addProducts(products);

            return new ResponseEntity<>(pro, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        try {
            List<Product> pro = productService.getProducts();
            return new ResponseEntity<>(pro, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam String category) {
        try {
            List<Product> pro = productService.getProductsByCategory(category);
            return new ResponseEntity<>(pro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/subcategory")
    public ResponseEntity<List<Product>> getProductsBySubCategory(@RequestParam String subCategory) {
        try {
            List<Product> pro = productService.getProductsBySubCategory(subCategory);
            return new ResponseEntity<>(pro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/brand")
    public ResponseEntity<List<Product>> getProductsByBrand(@RequestParam String brand) {
        try {
            List<Product> pro = productService.getProductsByBrand(brand);
            return new ResponseEntity<>(pro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/type")
    public ResponseEntity<List<Product>> getProductsByType(@RequestParam String type) {
        try {
            List<Product> pro = productService.getProductsByType(type);
            return new ResponseEntity<>(pro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

}
