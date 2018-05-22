package pl.sdacademy.bookshop.books;

import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.Year;
import java.util.List;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    public Book findById(Integer id){
        return bookRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Book findByTitle(String title){
        return bookRepository.findByTitle(title).orElseThrow(EntityNotFoundException::new);
    }

    public List<Book> findByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }

    public List<Book> findByIssueYear(Year year) {
        return bookRepository.findByIssueYear(year);
    }

    public Book update(Integer id, Book book){
        Book bookToUpdate = findById(id);
        bookToUpdate.setTitle(book.getTitle());
        bookToUpdate.setAuthor(book.getAuthor());
        bookToUpdate.setPublisher(book.getPublisher());
        bookToUpdate.setIssueYear(book.getIssueYear());
        bookToUpdate.setNoPages(book.getNoPages());
        bookToUpdate.setPrice(book.getPrice());
        bookToUpdate.setAmount(book.getAmount());
        bookRepository.save(bookToUpdate);
        return bookToUpdate;
    }

    public Book delete(Integer id){
        Book bookToDelete = findById(id);
        bookRepository.delete(bookToDelete);
        return bookToDelete;
    }

    public Book create(Book book){
        return bookRepository.save(book);
    }
}
