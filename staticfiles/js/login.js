$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault(); // Prevent form submission

        // Serialize the form data
        var formData = $(this).serialize();

        // Make the AJAX request to the API endpoint
        $.ajax({
            url: '/api/login/', // Replace with your actual API endpoint URL
            type: 'POST',
            data: formData,
            success: function(response) {
                // Handle the successful login
                console.log(response);
                alert('Login successful');
                // Redirect to the appropriate URL
                window.location.href = '/api/foods'; // Replace with the appropriate URL for the dashboard page
            },
            error: function(xhr, textStatus, errorThrown) {
                // Handle the login error
                console.log(xhr.responseJSON);
                var errorData = xhr.responseJSON;
                var errorMessage = 'Login failed. Please check your credentials.';
                if (errorData.detail === 'user not found') {
                    errorMessage = 'User does not exist.';
                }
                alert(errorMessage);
            }
        });
    });
});