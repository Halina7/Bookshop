package pl.sdacademy.bookshop.books;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>{
    Optional<Book> findByTitle(String title);
    List<Book> findByAuthor(String author);
    List<Book> findByIssueYear(Year year);
}


