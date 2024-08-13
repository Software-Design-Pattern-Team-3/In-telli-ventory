package com.backend.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.inventory.repository.SupplierRepository;
import com.backend.inventory.model.Supplier;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier addSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier getSupplier(Long supplierId) {
        
        return supplierRepository.findById(supplierId).orElse(null);
    }

    public Supplier updateSupplier(long id, Supplier updatedSupplier) {

        Supplier ext = supplierRepository.findById(id).orElse(null);
        if(ext!=null)
        {
            ext.setSupplierName(updatedSupplier.getSupplierName());
            ext.setContactInfo(updatedSupplier.getContactInfo());
            ext.setPerformanceRating(updatedSupplier.getPerformanceRating());

            return supplierRepository.save(ext);


        }
        return null;
    }

    public String deleteSupplier(long id) {
        
        Supplier s=supplierRepository.findById(id).orElse(null);
        if(s!=null)
        {
            supplierRepository.deleteById(id);
            return "user deleted with ID: "+id;
        }
        return "user not found";
    }
}