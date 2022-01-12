package com.raihan.stocksystem.service;

import com.raihan.stocksystem.model.Purchase;

import java.util.List;

public interface PurchaseService {
    public Purchase savePurchase(Purchase purchase);
    public List<Purchase> getAllPurchase();
}
