package com.raihan.stocksystem.controller;

import com.raihan.stocksystem.model.Users;
import com.raihan.stocksystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody Users users){
        userService.saveUsers(users);
        return "New User has been added";
    }

    @GetMapping("/getAll")
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }

//    @GetMapping("/getPass")
//    public List<Users> getPass(@RequestBody String username){ return userService.getPassword(username);}
}
