package com.mycompany.myapp.service.dto;

public class LoginResponseDTO {

    private String idToken;
    private AdminUserDTO user; // On réutilise le DTO existant qui est très complet

  

    public LoginResponseDTO() {}

    public LoginResponseDTO(String idToken, AdminUserDTO user) {
        this.idToken = idToken;
        this.user = user;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public AdminUserDTO getUser() {
        return user;
    }

    public void setUser(AdminUserDTO user) {
        this.user = user;
    }
}