package com.raihan.stocksystem.controller;

import com.raihan.stocksystem.model.Users;
import com.raihan.stocksystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<Users> saveUsers(@RequestBody Users user){
        return new ResponseEntity<Users>(userService.saveUsers(user), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable("id") int id){
        return new ResponseEntity<Users>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Users> updateEmployee(@PathVariable("id") int id
            ,@RequestBody Users user){
        return new ResponseEntity<Users>(userService.updateUsers(user, id), HttpStatus.OK);
    }

    @GetMapping("/get-email/{email}")
    public Users getUserByUsername(@PathVariable("email") String email){
        return userService.getUserByEmail(email);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id){

        userService.deleteUser(id);

        return new ResponseEntity<String>("User deleted successfully!", HttpStatus.OK);
    }
}
