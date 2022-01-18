package com.raihan.stocksystem.service;

import com.raihan.stocksystem.exception.ResourceNotFoundException;
import com.raihan.stocksystem.model.Purchase;
import com.raihan.stocksystem.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService{

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Override
    public Purchase savePurchase(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    @Override
    public List<Purchase> getAllPurchase() {
        return purchaseRepository.findAll();
    }

    @Override
    public Purchase getPurchaseById(int id){
        return purchaseRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));
    }

    @Override
    public Purchase updatePurchase(Purchase purchase, int id){
        Purchase existingPurchase = purchaseRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));

        existingPurchase.setQuantity(purchase.getQuantity());

        purchaseRepository.save(existingPurchase);
        return existingPurchase;
    }

    @Override
    public List<Purchase> getPurchaseByUserId(int userId){
        return purchaseRepository.findByUserId(userId);
    }

    @Override
    public void deletePurchase(int id) {
        Purchase existingPurchase = purchaseRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));
        purchaseRepository.deleteById(id);

    }


}
