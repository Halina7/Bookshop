$("#create-button").click(function() {
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
            $("#book-edit-modal").modal("hide");
        }
        //error: function(xhr) {
        //    handleValidationError(xhr.responseJSON);
        //}
    });
    return false;
});

function resetForm() {
    $("#create-button").show();
    $("#update-button").hide();

    $("#title").val("");
    $("#author").val("");
    $("#publisher").val("");
    $("#year").val("");
    $("#noPages").val("");
    $("#price").val("");
    $("#amount").val("");
}


$("#update-button").click(function() {

    var title = $("#title").val();
    var author = $("#author").val();
    var publisher = $("#publisher").val();
    var year = $("#year").val();
    var noPages = $("#noPages").val();
    var price = $("#price").val();
    var amount = $("#amount").val();

    var id = $("#update-button").data("bookId");

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
            resetForm();
        //    clearValidationErrors();
            fillTable();
            $("#book-edit-modal").modal("hide");
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

                $row.find(".book-edit").data("book", book);
                $row.find(".book-edit").click(function() {

                    $editorTitle = $("#editor-title");
                    $editorTitle.text('Edit a book');

                    $editor = $('#editor');
                    $editor.removeClass("required");

                    var book = $(this).data("book");        // $(this) - element, który został kliknięty
                    $("#title").val(book.title);
                    $("#author").val(book.author);
                    $("#publisher").val(book.publisher);
                    $("#year").val(book.issueYear);
                    $("#noPages").val(book.noPages);
                    $("#price").val(book.price);
                    $("#amount").val(book.amount);

                    $("#create-button").hide();
                    $("#update-button").show();

                    $("#update-button").data("book-id", book.bookId);
                    console.log(book + $bookId);
                });

                $row.find(".book-delete").data("book-id", book.bookId);
                $row.find(".book-delete").click(function() {

                    var id = $(this).data("book-id");
                    showDeleteModal(id);
                    console.log("delete book id: " + id);
                });

                resetForm();
                $(".book-create").click(function() {
                    resetForm();
                    $editorTitle = $("#editor-title");
                    $editorTitle.text('Add a book');

                });

                $row.find(".book-id").text(book.bookId);
                $row.find(".book-title").text(book.title);
                $row.find(".book-author").text(book.author);
                $row.find(".book-publisher").text(book.publisher);
                $row.find(".book-year").text(book.issueYear);
                $row.find(".book-no-pages").text(book.noPages);
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
            $row.find(".book-no-pages").text(book.noPages);
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
                $row.find(".book-no-pages").text(book.noPages);
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
                $row.find(".book-no-pages").text(book.noPages);
                $row.find(".book-price").text(book.price);
                $row.find(".book-amount").text(book.amount);
                $("#book-table tbody").append($row);
            }
        }
    });
});

fillTable();

