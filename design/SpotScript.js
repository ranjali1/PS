// Function to fetch user data and display it in the table
async function fetchUsers() {
    try {

       // console.log("companies");
        const response = await fetch("http://localhost:8080/spot"); // Update with the correct URL
        const spots = await response.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = ""; // Clear any existing rows

        spots.forEach(element => {
        //    console.log("id",element.spot_id);
            console.log("id",element.spot_id, "name:",element.spot_name);
            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.textContent = element.spot_id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = element.spot_name;
            row.appendChild(nameCell);

            const statusCell = document.createElement("td");
            statusCell.textContent = element.status;
            row.appendChild(statusCell);

            tableBody.append(row);
        
        });
      //  console.log(JSON.stringify(users));

        // let data = JSON.stringify(users);
        // console.log(users);
        // for(let user of users) {
        //     console.log("func ", user.company_id);
        //     const row = document.createElement("tr");

        //     const idCell = document.createElement("td");
        //     idCell.textContent = user.company_id;
        //     row.appendChild(idCell);

        //     const emailCell = document.createElement("td");
        //     emailCell.textContent = user.company_name;
        //     row.appendChild(emailCell);

        //     tableBody.appendChild(row);
        // };
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Call fetchUsers when the page loads
document.addEventListener("DOMContentLoaded", fetchUsers);
