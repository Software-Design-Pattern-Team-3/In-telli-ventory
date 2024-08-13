package com.backend.inventory.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTO {
    private Long productId;
    private Long userId;
    private int quantity;
    private String saleDate; 
    private double totalPrice;

}
