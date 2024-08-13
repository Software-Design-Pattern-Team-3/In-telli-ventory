package com.backend.inventory.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.inventory.dto.SaleDTO;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.Sale;
import com.backend.inventory.model.User;
import com.backend.inventory.service.ProductService;
import com.backend.inventory.service.SaleService;
import com.backend.inventory.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
@Tag(name = "Sales CRUD", description = "Endpoints for Sales CRUD operation")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Sale> getAllSales() {
        return saleService.getAllSales();
    }

    @PostMapping
    public ResponseEntity<Sale> createSale(@RequestBody SaleDTO saleDTO) {
        try {
            Long productId = saleDTO.getProductId();
            Long userId = saleDTO.getUserId();
            int quantity = saleDTO.getQuantity();
            double totalPrice = saleDTO.getTotalPrice();
            Date saleDate = new SimpleDateFormat("yyyy-MM-dd").parse(saleDTO.getSaleDate());

            Product product = productService.getProduct(productId);
            if (product == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User user = userService.getUser(userId);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Sale sale = new Sale();
            sale.setProduct(product);
            sale.setUser(user);
            sale.setQuantity(quantity);
            sale.setSaleDate(saleDate);
            sale.setTotalPrice(totalPrice);

            Sale createdSale = saleService.addSale(sale);
            return new ResponseEntity<>(createdSale, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable Long id, @RequestBody SaleDTO saleDTO) {
        try {
            Long productId = saleDTO.getProductId();
            Long userId = saleDTO.getUserId();
            int quantity = saleDTO.getQuantity();
            double totalPrice = saleDTO.getTotalPrice();
            Date saleDate = new SimpleDateFormat("yyyy-MM-dd").parse(saleDTO.getSaleDate());

            Product product = productService.getProduct(productId);
            if (product == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User user = userService.getUser(userId);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Sale updatedSale = saleService.updateSale(id, product, user, quantity, saleDate, totalPrice);
            if (updatedSale == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(updatedSale, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSale(@PathVariable Long id) {
        try {
            String result = saleService.deleteSale(id);
            if (result.contains("not found")) {
                return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
