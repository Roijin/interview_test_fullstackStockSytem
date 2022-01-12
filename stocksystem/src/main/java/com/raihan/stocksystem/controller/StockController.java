package com.raihan.stocksystem.controller;


import com.raihan.stocksystem.model.Stock;
import com.raihan.stocksystem.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
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
}