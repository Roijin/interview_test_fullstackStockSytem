package com.raihan.stocksystem.service;


import com.raihan.stocksystem.model.Users;
import com.raihan.stocksystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Users saveUsers(Users user) {
        return userRepository.save(user);
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

//    @Override
//    public List<Users> getPassword(String username) {
//        return userRepository.findAll(username);
//    }


}
