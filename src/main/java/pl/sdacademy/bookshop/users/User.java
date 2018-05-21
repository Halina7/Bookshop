package pl.sdacademy.bookshop.users;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;

@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    @Size(min = 3, message = "Username must be at least 3 characters long")
    @NotEmpty(message = "Username is required")
    private String username;

    @NotNull
    @Size(min = 4, message = "Password must be at least 4 characters long")
    @NotEmpty(message = "Password is required")
    private String password;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDate creationDate;

    @Email(message = "Incorrect email format")
    private String email;

    private Role role;

    public User() {}

    public User(@Size(min = 3, message = "Username must be at least 3 characters long")
                    @NotEmpty(message = "Username is required") String username,
                @NotNull @Size(min = 4, message = "Password must be at least 4 characters long")
                    @NotEmpty(message = "Password is required") String password,
                    LocalDate creationDate,
                    @Email(message = "Incorrect email format") String email,
                    Role role) {
        this.username = username;
        this.password = password;
        this.creationDate = creationDate;
        this.email = email;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.toString()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



    public Integer getId() {
        return id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
