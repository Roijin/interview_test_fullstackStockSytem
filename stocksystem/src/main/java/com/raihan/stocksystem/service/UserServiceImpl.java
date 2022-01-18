package com.raihan.stocksystem.service;


import com.raihan.stocksystem.exception.ResourceNotFoundException;
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

    @Override
    public Users getUserById(int id){

        return userRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));
    }

    @Override
    public Users updateUsers(Users user, int id) {
        Users existingUsers = userRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));

        existingUsers.setEmail(user.getEmail());
        existingUsers.setUsername(user.getUsername());
        existingUsers.setPassword(user.getPassword());

        userRepository.save(existingUsers);
        return existingUsers;
    }

    @Override
    public Users getUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void deleteUser(int id){
        Users existingUsers = userRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","ID",id));
        userRepository.deleteById(id);
    }
}
