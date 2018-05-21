$("#create-button").click(function() {
    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();
    var email = $("#inputEmail").val();

    var user = {
        username: username,
        password: password,
        email: email
    };

    $.post({
        url: "/unauth/create-customer",
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function() {
            window.location.href = "index.html"
        }
    });
    return false;
});





/*
$.post({
    url: "/unauth/create-customer",
    data: JSON.stringify(user),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
        window.location.href = "index.html";
        clearValidationErrors();
    },
    error: function(xhr) {
        handleValidationError(xhr.responseJSON);
    }
});
return false;
});

function clearValidationErrors() {
    $(".field").css("border", "");
    $(".validation-error").text("");
}

function handleValidationError(fieldValidationErrors) {
    clearValidationErrors();
    for(var i = 0; i < fieldValidationErrors.length; i++) {
        var fieldValidationError = fieldValidationErrors[i];
        var $field = $("[name='" + fieldValidationError.field + "']");
        $field.css("border", "3px red dashed");
        $field.siblings(".validation-error").text(fieldValidationError.message);
    }
}
*/




