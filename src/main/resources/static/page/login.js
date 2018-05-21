var username;

function checkAuthenticationStatus() {
    $.post({
        url: "/auth/login",
        success: function() {
            showUserName();
            displayMenuForCurrentUser();
        },
        error: function() {
            displayMenuForCurrentUser();
        }
    });
}

$("#login-button").click(function() {
    var username = $("#username").val();
    var password = $("#password").val();

    $.post({
        url: "/auth/login",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function(response) {
            console.log("udane logowanie!", response);
            $.get({
                url: "/unauth/role",
                success: function(response) {
                    showUserName();
                    displayMenuForCurrentUser();

/*                    if(response === "ROLE_EMPLOYEE") {
                        window.location.href = "book.html";
                    }*/
                }
            });
            showUserName();
            displayMenuForCurrentUser();
        },
        error: function() {
            alert("Niepoprawne logowanie!");
        }
    });
});

$("#logout-button").click(function() {
    $.post({
        url: "/auth/login",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(":"));
        },
        success: function() {
            alert("Niepoprawne wylogowanie");
        },
        error: function() {
            console.log('wylogowany');
            window.location.href = "index.html";
        }
    });
});

function showUserName() {
    $.get({
        url: "/auth/username",
        success: function (response) {
            username = response;
            console.log("hello" + username);
            $("#user-greeting").text("You are logged in as: " + username);
        }
    })
}

function displayMenuForRole(role) {

    $(".navbar-nav > li").hide();
    $("li.menu-role-" + role).show();

    /*    if(role != "ROLE_EMPLOYEE")
    $(".change-buttons").hide();*/

    console.log($("li.menu-role-" + role));
}


function displayMenuForCurrentUser() {

    $.get({
        url: "/unauth/role",
        success: function(response) {
            console.log(response);
            displayMenuForRole(response);
        }
    })
}

/*function showMenuForNotLoggedIn() {
    $("#home-nav-link").show();
    $("#search-nav-link").show();
    $("#register-nav-link").show();
    $("#account-nav-link").hide();
    $("#edit-book-nav-link").hide();
    $("#edit-user-nav-link").hide();
    $("#login-menu-item").show();
    $("#logout-menu-item").hide();
}*/

checkAuthenticationStatus();
