package com.raihan.stocksystem.model;


import javax.persistence.*;
import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private String email;

    private String password;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Purchase.class)
    @JoinColumn(name = "user_id")
    private List<Purchase> idUserPurchase;

    public Users() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Purchase> getIdUserPurchase() {
        return idUserPurchase;
    }

    public void setIdUserPurchase(List<Purchase> idUserPurchase) {
        this.idUserPurchase = idUserPurchase;
    }
}
