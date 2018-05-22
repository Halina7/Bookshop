var url = new URL(window.location.href);
var id = url.searchParams.get("id");
console.log(id);

$.get({
    url: "/unauth/book/" + id,
    success: function(response) {
        $(".book-id").text(response.id);
        $(".book-title").text(response.title);
        $(".book-author").text(response.author);
        $(".book-publisher").text(response.publisher);
        $(".book-year").text(response.issueYear);
        $(".book-no-pages").text(response.noPages);
        $(".book-price").text(response.price);
        $(".book-amount").text(response.amount);
    }
});