package com.raihan.stocksystem.controller;

import com.raihan.stocksystem.model.Purchase;
import com.raihan.stocksystem.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase")
@CrossOrigin
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/add")
    public String add(@RequestBody Purchase purchase){
        purchaseService.savePurchase(purchase);
        return "Item added to purchase";
    }

    @GetMapping("/getAll")
    public List<Purchase> getAllPurchase(){
        return purchaseService.getAllPurchase();
    }
}
