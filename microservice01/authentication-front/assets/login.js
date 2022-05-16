$(function() {
    $('#login-submit-btn').on('click', function () {
        let user = $('#login-user-input').val().toString();
        let password = $('#login-password-input').val().toString();

        let username = (user.includes('@') ? "" : user);
        let email = (user.includes('@') ? user : "");

        makeLoginCall(username, email, password);
    })
});

// LOGIN REQUEST
function makeLoginCall(username, email, password) {
    $.ajax({
        url: 'http://127.0.0.1:9101/authorisation/api/login',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true   // Sends http requests with credentials (ex. cookies)
        },
        data: JSON.stringify({
            "username" : username,
            "email" : email,   
            "password" : password
        }),
        success: function() {
            console.log('You are logged in !');
            window.location.replace("http://127.0.0.1:80/?user="+username);
        },
        error: function() { // WRONG CREDENTIALS
            console.log('Error in login !');
            // window.location.replace("http://127.0.0.1:80/login");
        }
    });
}