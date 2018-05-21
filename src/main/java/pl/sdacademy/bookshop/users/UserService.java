package pl.sdacademy.bookshop.users;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User update(Integer id, User user){
        User userToUpdate = findById(id);
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setEmail(user.getEmail());
        userRepository.save(userToUpdate);
        return userToUpdate;
    }

    public User delete(Integer id){
        User user = findById(id);
        userRepository.delete(user);
        return user;
    }
}