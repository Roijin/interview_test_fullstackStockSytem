package com.raihan.stocksystem.repository;

import com.raihan.stocksystem.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase,Integer> {
    @Query("SELECT p FROM Purchase p WHERE p.user_id=?1")
    List<Purchase> findByUserId(int userId);
}
