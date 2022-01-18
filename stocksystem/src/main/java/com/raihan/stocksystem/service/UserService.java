package com.raihan.stocksystem.service;

import com.raihan.stocksystem.model.Users;

import java.util.List;

public interface UserService {
    Users saveUsers(Users user);
    List<Users> getAllUsers();
    Users getUserById(int id);
    Users updateUsers(Users user, int id);
    Users getUserByEmail(String email);
    void deleteUser(int id);
}
