package pl.sdacademy.bookshop;

import org.springframework.stereotype.Component;
import pl.sdacademy.bookshop.books.Book;
import pl.sdacademy.bookshop.books.BookRepository;
import pl.sdacademy.bookshop.users.Role;
import pl.sdacademy.bookshop.users.User;
import pl.sdacademy.bookshop.users.UserRepository;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DBInitializer {
    private UserRepository userRepository;
    private BookRepository bookRepository;
    List<String> authors;

    public DBInitializer(UserRepository userRepository, BookRepository bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        authors = new ArrayList<>();
}

    @PostConstruct
    private void initializeDB(){
        userRepository.save(new User("admin","admin", LocalDate.now(),"admin@vp.pl",  Role.ROLE_EMPLOYEE));
        userRepository.save(new User("user1","user1", LocalDate.now(),"userone@op.pl", Role.ROLE_CUSTOMER));
        userRepository.save(new User("user2","user2", LocalDate.now(),"usertwo@op.pl", Role.ROLE_CUSTOMER));

        bookRepository.save(new Book("Harry Potter i Czara Ognia", "Rowling",
                "Media Rodzina", Year.of(2016), 770, new BigDecimal(30),4));
        bookRepository.save(new Book("Adres nieznany", "Child",
                "Albatros", Year.of(2017), 450, new BigDecimal(24),3));
        bookRepository.save(new Book("Harry Potter i Insygnia Śmierci ", "Rowling",
                "Media Rodzina", Year.of(2016), 780, new BigDecimal(32),5));
        bookRepository.save(new Book("Nieodnaleziona", "Mróz",
                "Filia", Year.of(2018), 400, new BigDecimal(39),2));
        bookRepository.save(new Book("Florystka", "Bonda",
                "Muza", Year.of(2014), 670, new BigDecimal(30),4));
        bookRepository.save(new Book("Uprowadzony", "Child",
                "Albatros", Year.of(2017), 450, new BigDecimal(26),6));

    }
}
