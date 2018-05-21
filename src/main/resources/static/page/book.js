$("#create-book-button").click(function() {
    var title = $("#title").val();
    var author = $("#author").val();
    var publisher = $("#publisher").val();
    var year = $("#year").val();
    var noPages = $("#noPages").val();
    var price = $("#price").val();
    var amount = $("#amount").val();

    var book = {
        title: title,
        author: author,
        publisher: publisher,
        issueYear: year,
        noPages: noPages,
        price: price,
        amount: amount
    };

    $.post({
        url: "/auth/book",
        data: JSON.stringify(book),
        contentType: "application/json; charset=utf-8",
        success: function(response) {
         //   clearValidationErrors();
            fillTable();
        }
        //error: function(xhr) {
        //    handleValidationError(xhr.responseJSON);
        //}
    });
    return false;
});

$("#update-button").click(function() {
    var $editorTitle = $('#editor-title');

    var title = $("#title").val();
    var author = $("#author").val();
    var publisher = $("#publisher").val();
    var year = $("#year").val();
    var noPages = $("#noPages").val();
    var price = $("#price").val();
    var amount = $("#amount").val();

    var id = $("#update-button").data("id");

    var book = {
        title: title,
        author: author,
        publisher: publisher,
        issueYear: year,
        noPages: noPages,
        price: price,
        amount: amount
    };

    $.ajax({
        url: "/auth/book/" + id,
        method: "PUT",
        data: JSON.stringify(book),
        contentType: "application/json; charset=utf-8",
        success: function(response) {
        //    resetForm();
        //    clearValidationErrors();
            fillTable();
        },
        error: function(xhr) {
       //     handleValidationError(xhr.responseJSON);
        }
    });
    return false;
});

function showDeleteModal(id) {
//    $("#delete-modal").modal("show");

   // $("#delete-confirm-button").off("click");
    $("#delete-confirm-button").click(function () {
        console.log(id);
        $.ajax({
            url: "/auth/book/" + id,
            method: "DELETE",
            success: function (book) {
                console.log("Usunięto obiekt: ", book);
                 fillTable();
                //   resetForm();
                $("#book-delete-modal").modal("hide");
            }
        });
    });
}

function fillTable() {
    $("#book-table tbody tr:not(#row-template)").remove();
    $.get({
        url: "/unauth/book",
        success: function (response) {
            $rowTemplate = $("#row-template");
            for (var i = 0; i < response.length; i++) {
                var book = response[i];
                var $row = $rowTemplate.clone();
                $row.removeAttr("id").removeClass("d-none");

                var $bookId = $row.find(".book-id");
                $bookId.text(book.bookId);
                //     console.log($bookId);

                var hrefAttr = $bookId.attr("href");
                $bookId.attr("href", hrefAttr + "?id=" + book.bookId);
                //      console.log($bookId.attr("href"));




                $row.find(".book-delete").data("book-id", book.bookId);
                $row.find(".book-delete").click(function() {
                    var id = $(this).data("book-id");
                    showDeleteModal(id);
                    console.log("delete modal + id" + id);
                });

                $row.find(".book-id").text(book.bookId);
                $row.find(".book-title").text(book.title);
                $row.find(".book-author").text(book.author);
                $row.find(".book-publisher").text(book.publisher);
                $row.find(".book-year").text(book.issueYear);
                $row.find(".book-no-pages").text(book.numPages);
                $row.find(".book-price").text(book.price);
                $row.find(".book-amount").text(book.amount);
                $("#book-table tbody").append($row);

            }
        }
    })
}

$("#bn-find-by-title").click(function () {
    var title = $("#mtitle").val();
    $("#find-by-title").modal("hide");                          // wyłącznie modala

    $("#book-table tbody tr:not(#row-template)").remove();      //wyczyszczenie tabeli
    $.get({
        url: "/unauth/booktitle/" + title,
        success: function (response) {
            console.log(response);

            $rowTemplate = $("#row-template");
            console.log($rowTemplate);
            var book = response;
            console.log(book);
            var $row = $rowTemplate.clone();
            $row.removeAttr("id").removeClass("d-none");
            $row.find(".book-id").text(book.bookId);
            $row.find(".book-title").text(book.title);
            $row.find(".book-author").text(book.author);
            $row.find(".book-publisher").text(book.publisher);
            $row.find(".book-year").text(book.issueYear);
            $row.find(".book-no-pages").text(book.numPages);
            $row.find(".book-price").text(book.price);
            $row.find(".book-amount").text(book.amount);
            $("#book-table tbody").append($row);
            console.log($row, $("#book-table tbody"));
        }
    });
});

$("#bn-find-by-author").click(function () {
    var author = $("#mauthor").val();
    $("#find-by-author").modal("hide");                          // wyłącznie modala

    $("#book-table tbody tr:not(#row-template)").remove();      //wyczyszczenie tabeli
    $.get({
        url: "/unauth/bookauthor/" + author,
        success: function (response) {
            console.log(response);
            $rowTemplate = $("#row-template");
            for (var i = 0; i < response.length; i++) {
                var book = response[i];
                var $row = $rowTemplate.clone();
                $row.removeAttr("id").removeClass("d-none");
                $row.find(".book-id").text(book.bookId);
                $row.find(".book-title").text(book.title);
                $row.find(".book-author").text(book.author);
                $row.find(".book-publisher").text(book.publisher);
                $row.find(".book-year").text(book.issueYear);
                $row.find(".book-no-pages").text(book.numPages);
                $row.find(".book-price").text(book.price);
                $row.find(".book-amount").text(book.amount);
                $("#book-table tbody").append($row);
            }
        }
    });
});

$("#bn-find-by-year").click(function () {
    var year = $("#myear").val();
    $("#find-by-year").modal("hide");                          // wyłącznie modala

    $("#book-table tbody tr:not(#row-template)").remove();      //wyczyszczenie tabeli
    $.get({
        url: "/unauth/bookyear/" + year,
        success: function (response) {
            console.log(response);
            $rowTemplate = $("#row-template");
            for (var i = 0; i < response.length; i++) {
                var book = response[i];
                var $row = $rowTemplate.clone();
                $row.removeAttr("id").removeClass("d-none");
                $row.find(".book-id").text(book.bookId);
                $row.find(".book-title").text(book.title);
                $row.find(".book-author").text(book.author);
                $row.find(".book-publisher").text(book.publisher);
                $row.find(".book-year").text(book.issueYear);
                $row.find(".book-no-pages").text(book.numPages);
                $row.find(".book-price").text(book.price);
                $row.find(".book-amount").text(book.amount);
                $("#book-table tbody").append($row);
            }
        }
    });
});

fillTable();

