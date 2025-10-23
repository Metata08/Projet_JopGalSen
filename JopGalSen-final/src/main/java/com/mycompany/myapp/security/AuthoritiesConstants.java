package com.mycompany.myapp.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "admin";

    public static final String USER = "user";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String RECRUTEUR = "recruteur";
    public static final String CANDIDAT = "candidat"; 
    
    private AuthoritiesConstants() {}
}