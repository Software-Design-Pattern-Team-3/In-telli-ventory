package com.backend.inventory.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.inventory.repository.SaleRepository;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.Sale;
import com.backend.inventory.model.Supplier;
import com.backend.inventory.model.User;
@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale addSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public Sale updateSale(Long id, Product product, User user, int quantity, Date saleDate, double totalPrice) {
        Sale existingSale = saleRepository.findById(id).orElse(null);
        if (existingSale != null) {
            existingSale.setProduct(product);
            existingSale.setUser(user);
            existingSale.setQuantity(quantity);
            existingSale.setSaleDate(saleDate);
            existingSale.setTotalPrice(totalPrice);
            return saleRepository.save(existingSale);
        }
        return null;
    }

    public String deleteSale(Long id) {
        Sale sale = saleRepository.findById(id).orElse(null);
        if (sale != null) {
            saleRepository.deleteById(id);
            return "Sale deleted with ID: " + id;
        }
        return "Sale not found";
    }
}
