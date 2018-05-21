/*package pl.sdacademy.bookshop.shoppings;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.format.annotation.NumberFormat;
import pl.sdacademy.bookshop.books.Book;
import pl.sdacademy.bookshop.users.User;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Map;

@Entity
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @NotEmpty
    @OneToOne
    private User user;

    @ManyToMany
    @Cascade(value = CascadeType.SAVE_UPDATE)
    private Map<Book, Integer> books;               // key: book - value: amount of this books

    @NumberFormat
    private BigDecimal bill;

    public Basket(){}



}*/
