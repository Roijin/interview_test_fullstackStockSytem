package com.raihan.stocksystem.service;

import com.raihan.stocksystem.exception.ResourceNotFoundException;
import com.raihan.stocksystem.model.Stock;
import com.raihan.stocksystem.model.Users;
import com.raihan.stocksystem.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class StockServiceImpl implements StockService{

    @Autowired
    private StockRepository stockRepository;

    @Override
    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }

    @Override
    public Stock getStockById(int id){
        return stockRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));
    }

    @Override
    public Stock updateStock(Stock stock, int id) {
        Stock existingStock = stockRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));

        existingStock.setName(stock.getName());
        existingStock.setQuantity(stock.getQuantity());
        existingStock.setPrice(stock.getPrice());

        stockRepository.save(existingStock);
        return existingStock;
    }

    @Override
    public void deleteStock(int id){
        Stock existingStock = stockRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));
        stockRepository.deleteById(id);
    }
}
