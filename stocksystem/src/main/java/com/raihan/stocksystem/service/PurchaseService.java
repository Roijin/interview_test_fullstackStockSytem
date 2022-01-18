package com.raihan.stocksystem.service;

import com.raihan.stocksystem.model.Purchase;

import java.util.List;

public interface PurchaseService {
    Purchase savePurchase(Purchase purchase);
    List<Purchase> getAllPurchase();
    Purchase getPurchaseById(int id);
    Purchase updatePurchase(Purchase purchase,int id);
    List<Purchase> getPurchaseByUserId(int id);
    void deletePurchase(int id);
}
