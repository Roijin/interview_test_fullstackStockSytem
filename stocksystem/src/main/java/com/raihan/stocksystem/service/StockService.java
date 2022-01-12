package com.raihan.stocksystem.service;

import com.raihan.stocksystem.model.Stock;

import java.util.List;

public interface StockService {
    public Stock saveStock(Stock stock);
    public List<Stock> getAllStock();
}
