document.getElementById("login-btn").addEventListener("click",function(event){
  event.preventDefault();

  window.location.href = "login.html";
});
async function fetchCompanies() {
  try {
    const response = await fetch(`${address}/dash`);
    const cmps = await response.json();
   // renderCompanies(cmps);

    const message = document.getElementById("message");
    const filter = document.getElementById("filter");

    message.innerHTML = "Please, select a place"

    filter.addEventListener("change", () => {
      const searchTerm = filter.value.toLowerCase();
      const filteredCompanies = cmps.filter((cmp) =>
        cmp.p_id.toString().toLowerCase().includes(searchTerm)
      );

      if(filter.value == -1)
      {
        message.innerHTML = "Please, select a place"
      }
      else if(filteredCompanies.length <= 0)
        {
          message.innerHTML = "No parking area found for this place "
        }
      else
        {
          message.innerHTML = "Choose Your Parking Area";
        }
      renderCompanies(filteredCompanies);   
     });
    // Add search functionality
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredCompanies = cmps.filter((cmp) =>
        cmp.company_name.toLowerCase().includes(searchTerm)
      );
      renderCompanies(filteredCompanies);
    });
  } catch (err) {
    console.error("fetch dashboard error", err);
  }
}
async function fetchPlace()
{
  try{
    const response = await fetch(`${address}/place`);
    const pls = await response.json();

    const filter = document.getElementById("filter");

   for (let ps of pls)
    {
      const option = document.createElement("option");
      option.value = ps.p_id;
      option.innerHTML = ps.p_name;
      filter.appendChild(option);
      // console.log("id ", ps.p_id, "name ", ps.p_name);
   }

    
  }catch(err)
  {
    console.log("fetch place err ", err);
  }
}
fetchPlace();

function renderCompanies(companies) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear the existing cards

  for (let cmp of companies) {
    console.log("image ", cmp.image);
    const card = document.createElement("card");
    card.className = "card";
    const img = document.createElement("img");
    //img.src = "majdi mall.jpg";
    img.src = `images/${cmp.image}`;
    //img.src = `images/1733174127139-420017296.jpg`;

    card.appendChild(img);

    const compNameE = document.createElement("h3");
    compNameE.textContent = cmp.company_name;
    card.appendChild(compNameE);

    const p = document.createElement("p");
    p.textContent = `Parking area in ${cmp.company_name}`;
    card.appendChild(p);

    const button = document.createElement("button");
    button.textContent = "View Parking Area";
    button.onclick = function () {
      let role = localStorage.getItem("role");
      if (role == "2") {
        localStorage.setItem("comp_id", cmp.company_id);
        window.location = "SpotAdmin.html";
      } else {
        localStorage.setItem("comp_id", cmp.company_id);
       // window.location = "SpotDesignN.html";
        window.location = "SpotDesignV2.html";
      }
    };
    card.appendChild(button);

    cardContainer.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", fetchCompanies);
