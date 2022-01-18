package com.raihan.stocksystem.service;

import com.raihan.stocksystem.model.Stock;

import java.util.List;

public interface StockService {
    Stock saveStock(Stock stock);
    List<Stock> getAllStock();
    Stock getStockById(int id);
    Stock updateStock(Stock stock,int id);
    void deleteStock(int id);
}
