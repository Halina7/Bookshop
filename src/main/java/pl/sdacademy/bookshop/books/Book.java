package pl.sdacademy.bookshop.books;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.math.BigDecimal;
import java.time.Year;
import java.util.List;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;

    @NotEmpty(message = "Title is required")
    @NotNull
    private String title;

/*    @ElementCollection
    @NotEmpty(message = "Author is required")
    private List<String> author;*/

    @NotEmpty(message = "Author is required")
    @NotNull
    private String author;

    @NotEmpty(message = "Publisher is required")
    @NotNull
    private String publisher;

    @PastOrPresent
    @DateTimeFormat(pattern = "yyyy")
    private Year issueYear;

    @NumberFormat
    private Integer numPages;

    @NumberFormat
    private BigDecimal price;

    @NumberFormat
    private Integer amount;

    public Book(){}

    public Book(@NotEmpty(message = "Title is required") String title,
                @NotEmpty(message = "Author is required") String author,
                @NotEmpty(message = "Publisher is required") String publisher,
                @PastOrPresent Year issueYear,
                Integer numPages,
                BigDecimal price,
                Integer amount) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.issueYear = issueYear;
        this.numPages = numPages;
        this.price = price;
        this.amount = amount;
    }

    public Integer getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Year getIssueYear() {
        return issueYear;
    }

    public void setIssueYear(Year issueYear) {
        this.issueYear = issueYear;
    }

    public Integer getNumPages() {
        return numPages;
    }

    public void setNumPages(Integer numPages) {
        this.numPages = numPages;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
