// Function to fetch user data and display it in the table
async function fetchUsers() {
  try {
    // console.log("companies");
    const response = await fetch("http://192.168.1.27:8080/company"); // Update with the correct URL
    const users = await response.json();

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear any existing rows

    //  console.log(JSON.stringify(users));

    // let data = JSON.stringify(users);
    for (let user of users) {
      console.log("func ", user.company_id);
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = user.company_id;
      row.appendChild(idCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = user.company_name;
      row.appendChild(emailCell);

      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Call fetchUsers when the page loads
document.addEventListener("DOMContentLoaded", fetchUsers);
