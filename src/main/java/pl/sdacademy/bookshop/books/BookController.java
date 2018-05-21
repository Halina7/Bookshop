package pl.sdacademy.bookshop.books;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Year;
import java.util.Arrays;
import java.util.List;

@RestController
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/unauth/book")
    public List<Book> getAll() {
        return bookService.findAll();
    }

    @GetMapping("/unauth/book/{id}")
    public Book getById(@PathVariable("id") Integer id) {
        return bookService.findById(id);
    }

    @GetMapping("/unauth/booktitle/{title}")
    public Book getByTitle(@PathVariable("title") String title) {
        return bookService.findByTitle(title);
    }

    @GetMapping("/unauth/bookauthor/{author}")
    public List<Book> getByAuthor(@PathVariable("author") String author){
        return bookService.findByAuthor(author);
    }

    @GetMapping("/unauth/bookyear/{year}")
    public List<Book> getByIssueYear(@PathVariable("year")Year year){
        return bookService.findByIssueYear(year);
    }

    @Secured("ROLE_EMPLOYEE")
    @PutMapping("/auth/book/{id}")
    public Book update(@PathVariable("id") Integer id, @RequestBody @Valid Book book) {
        return bookService.update(id, book);
    }

    @Secured("ROLE_EMPLOYEE")
    @DeleteMapping("/auth/book/{id}")
    public Book delete(@PathVariable("id") Integer id) {
        return bookService.delete(id);
    }

    @Secured("ROLE_EMPLOYEE")
    @PostMapping("/auth/book")
    public Book create(@RequestBody @Valid Book book) {
        return bookService.create(book);
    }
}