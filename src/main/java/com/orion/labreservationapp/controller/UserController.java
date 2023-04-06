package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.User;
import com.orion.labreservationapp.requests.UpdateUserDetailsRequest;
import com.orion.labreservationapp.service.UserService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    
    private UserService userService;

    @GetMapping
    public List<User> getAllUser(){
        return userService.getAllUsers();
    }

    @PostMapping
    public User crateUser(@RequestBody User newUser){
        return userService.saveOneUser(newUser);
    }

    @GetMapping("/{userId}")
    public User getOneUserById(@PathVariable Long userId){
        //custom exception
        return userService.getOneUserById(userId);
    }

    @PutMapping("/{userId}")
    public User updateOneUser(@PathVariable Long userId, @RequestBody UpdateUserDetailsRequest newUser){
        return userService.updateOneUser(userId,newUser);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable Long userId){
        userService.deleteById(userId);
    }
}
