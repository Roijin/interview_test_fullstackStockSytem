package com.raihan.stocksystem.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;

    private String name;

    private int quantity;

    private int price;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Purchase.class)
    @JoinColumn(name = "item_id")
    private List<Purchase> idItemPurchase;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public List<Purchase> getIdItemPurchase() {
        return idItemPurchase;
    }

    public void setIdItemPurchase(List<Purchase> idItemPurchase) {
        this.idItemPurchase = idItemPurchase;
    }
}
