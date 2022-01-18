package com.raihan.stocksystem.controller;

import com.raihan.stocksystem.model.Purchase;
import com.raihan.stocksystem.model.Users;
import com.raihan.stocksystem.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/get/{id}")
    public ResponseEntity<Purchase> getUserById(@PathVariable("id") int id){
        return new ResponseEntity<Purchase>(purchaseService.getPurchaseById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Purchase> updateEmployee(@PathVariable("id") int id
            ,@RequestBody Purchase user){
        return new ResponseEntity<Purchase>(purchaseService.updatePurchase(user, id), HttpStatus.OK);
    }

    @GetMapping("/get-user/{id}")
    public List<Purchase> getPurchaseByUserId(@PathVariable("id") int id){
        return purchaseService.getPurchaseByUserId(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id){

        purchaseService.deletePurchase(id);

        return new ResponseEntity<String>("User deleted successfully!", HttpStatus.OK);
    }

}
