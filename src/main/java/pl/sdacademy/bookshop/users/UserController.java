package pl.sdacademy.bookshop.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/unauth/credentials")
    public String getCredentials(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String result = authentication.getName() + " roles: ";
        result += String.join(", ",authentication.getAuthorities()
                .stream()
                .map(a -> a.getAuthority())
                .toArray(String[]::new));
        return result;
    }

    @GetMapping("/unauth/role")
    public String getRole(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .findFirst()
                .orElse("");
    }

/*    @GetMapping("/unauth/roles")
    public List<String> getRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities()
                .stream()
                .map(a -> a.getAuthority())
                .collect(Collectors.toList());
    }*/

    @PostMapping("/auth/login")
    public boolean login(){
        return true;
    }

    @Secured("ROLE_EMPLOYEE")
    @PostMapping("/auth/create-employee")
    public User createEmployee(@RequestBody @Valid User user) {
        user.setRole(Role.ROLE_EMPLOYEE);
        userService.create(user);
        return user;
    }

    @PostMapping("/unauth/create-customer")
    public User createCustomer(@RequestBody @Valid User user) {
        user.setRole(Role.ROLE_CUSTOMER);
        userService.create(user);
        return user;
    }

    @Secured("ROLE_EMPLOYEE")
    @GetMapping("/auth/show-users")
    public List<User> getAll(){
        return userService.findAll();
    }

    @GetMapping("/unauth/user/{id}")
    public User getById(@PathVariable("id") Integer id){
        return userService.findById(id);
    }

    @Secured("ROLE_EMPLOYEE")
    @PutMapping("/auth/user/{id}")
    public User update(@PathVariable("id") Integer id, @RequestBody @Valid User user) {
        return userService.update(id, user);
    }

    @Secured("ROLE_EMPLOYEE")
    @DeleteMapping("/auth/user/{id}")
    public User delete(@PathVariable("id") Integer id ){
        return userService.delete(id);
    }

    @GetMapping("/auth/username")
    public String currentUserName(Principal principal) {
        return principal.getName();
    }
}

