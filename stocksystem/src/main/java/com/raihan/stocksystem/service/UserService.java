package com.raihan.stocksystem.service;

import com.raihan.stocksystem.model.Users;

import java.util.List;

public interface UserService {
    public Users saveUsers(Users user);
    public List<Users> getAllUsers();
    //public List<Users> getPassword(String username);
}
