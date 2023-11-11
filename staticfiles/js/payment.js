function cancelOrder() {
    // Get the order ID and payment ID from the HTML template
    const orderID = {
        { order.id } };
    const paymentID = {
        { payment.id }
    };

    // Send a DELETE request to the API endpoint for canceling the order
    fetch(`/api/orders/${orderID}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Order canceled successfully, redirect to a confirmation page or perform any additional actions
                window.location.href = '/order-cancel-confirmation/';
            } else {
                // Handle the case when order cancellation fails
                console.error('Failed to cancel the order.');
            }
        })
        .catch(error => console.error(error));
}