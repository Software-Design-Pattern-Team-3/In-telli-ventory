package com.backend.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.inventory.service.SupplierService;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.backend.inventory.model.Supplier;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin("*")
@Tag(name = "Supplier CRUD", description = "Endpoints for Supplier CRUD operation")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @PostMapping
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        return supplierService.addSupplier(supplier);
    }

    @PutMapping("/{id}")
    public Supplier updatSupplier(@PathVariable long id,@RequestBody Supplier updatedSupplier)
    {
        return supplierService.updateSupplier(id, updatedSupplier);
    }

    @DeleteMapping("/{id}")
    public String deleteSupplier(@PathVariable long id)
    {
        return supplierService.deleteSupplier(id);
    }
}