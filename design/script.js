document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    //console.log("printed");

    // Retrieve user input values from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Send a POST request to the /login endpoint with email and password
        const response = await fetch("http://localhost:8080/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // Parse the JSON response
        const result = await response.json();
        
        // Display success or failure message based on the login result
        const messageElement = document.getElementById("message");
        if (result.success) {
            messageElement.style.color = "green";
            messageElement.textContent = "Login successful!";
            // Additional actions on success, like redirecting the user
            // window.location.href = "/dashboard"; // example redirect
        } else {
            messageElement.style.color = "red";
            messageElement.textContent = result.message || "Invalid credentials";
        }
    } catch (error) {
        // Handle errors such as network issues
        document.getElementById("message").textContent = "Error logging in. Please try again.";
        console.error("Error:", error);
    }
});
