package com.backend.inventory.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.inventory.repository.PurchaseOrderRepository;
import com.backend.inventory.dto.PurchaseDTO;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.PurchaseOrder;
import com.backend.inventory.model.Review;
import com.backend.inventory.model.Supplier;

@Service
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private ProductService productService;

    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll();
    }

    public PurchaseOrder addPurchaseOrder(PurchaseDTO purchaseDTO) {
        Supplier supplier = supplierService.getSupplier(purchaseDTO.getSupplierId());
        Product product = productService.getProduct(purchaseDTO.getProductId());

        if (supplier == null || product == null) {
            return null;
        }

        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setSupplier(supplier);
        purchaseOrder.setProduct(product);
        purchaseOrder.setOrderDate(purchaseDTO.getOrderDate());
        purchaseOrder.setQuantity(purchaseDTO.getQuantity());
        purchaseOrder.setStatus(purchaseDTO.getStatus());
        purchaseOrder.setTotal_cost(purchaseDTO.getTotalCost());

        return purchaseOrderRepository.save(purchaseOrder);
    }

    public PurchaseOrder updatePurchase(Long id, PurchaseDTO purchaseDTO) {
        PurchaseOrder existingPurchaseOrder = purchaseOrderRepository.findById(id).orElse(null);
        if (existingPurchaseOrder != null) {
            Supplier supplier = supplierService.getSupplier(purchaseDTO.getSupplierId());
            Product product = productService.getProduct(purchaseDTO.getProductId());

            if (supplier == null || product == null) {
                return null;
            }

            existingPurchaseOrder.setSupplier(supplier);
            existingPurchaseOrder.setProduct(product);
            existingPurchaseOrder.setOrderDate(purchaseDTO.getOrderDate());
            existingPurchaseOrder.setQuantity(purchaseDTO.getQuantity());
            existingPurchaseOrder.setStatus(purchaseDTO.getStatus());
            existingPurchaseOrder.setTotal_cost(purchaseDTO.getTotalCost());

            return purchaseOrderRepository.save(existingPurchaseOrder);
        }
        return null;
    }

    public String deletePurchase(Long id) {
        PurchaseOrder purchaseOrder = purchaseOrderRepository.findById(id).orElse(null);
        if (purchaseOrder != null) {
            purchaseOrderRepository.deleteById(id);
            return "Purchase order deleted with ID: " + id;
        }
        return "Purchase order not found";
    }
}
