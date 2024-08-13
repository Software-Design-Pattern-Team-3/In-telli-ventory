package com.backend.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.inventory.dto.ProductDTO;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.Supplier;
import com.backend.inventory.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierService supplierService;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product addProduct(ProductDTO productDTO) {
        Supplier supplier = supplierService.getSupplier(productDTO.getSupplierId());
        if (supplier == null) {
            return null;
        }

        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setCategory(productDTO.getCategory());
        product.setPrice(productDTO.getPrice());
        product.setCost(productDTO.getCost());
        product.setStockLevel(productDTO.getStockLevel());
        product.setReorderLevel(productDTO.getReorderLevel());
        product.setSupplier(supplier);

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct == null) {
            return null;
        }

        Supplier supplier = supplierService.getSupplier(productDTO.getSupplierId());
        if (supplier == null) {
            return null;
        }

        existingProduct.setProductName(productDTO.getProductName());
        existingProduct.setCategory(productDTO.getCategory());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setCost(productDTO.getCost());
        existingProduct.setStockLevel(productDTO.getStockLevel());
        existingProduct.setReorderLevel(productDTO.getReorderLevel());
        existingProduct.setSupplier(supplier);

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
