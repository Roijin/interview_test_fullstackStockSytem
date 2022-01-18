package com.raihan.stocksystem.controller;


import com.raihan.stocksystem.model.Stock;
import com.raihan.stocksystem.model.Users;
import com.raihan.stocksystem.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock")
@CrossOrigin
public class StockController {
    @Autowired
    private StockService stockService;

    @PostMapping("/add")
    public String add(@RequestBody Stock stock){
        stockService.saveStock(stock);
        return "New item added to stock";
    }

    @GetMapping("/getAll")
    public List<Stock> getAllStock(){
        return stockService.getAllStock();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Stock> getStockById(@PathVariable("id") int id){
        return new ResponseEntity<Stock>(stockService.getStockById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Stock> updateEmployee(@PathVariable("id") int id
            ,@RequestBody Stock stock){
        return new ResponseEntity<Stock>(stockService.updateStock(stock, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable("id") int id){

        stockService.deleteStock(id);

        return new ResponseEntity<String>("Item deleted successfully!", HttpStatus.OK);
    }
}