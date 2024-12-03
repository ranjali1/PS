// document.getElementById("spots").addEventListener("click", function(){
// window.location.href = "./SpotDesignn.html";
// }); mr

const spotName = document.getElementById("spotName");
const sides = document.querySelector(".sides");
const sections = document.getElementById("sections");
const btn = document.getElementById("addSpotS");
const  compID = localStorage.getItem("comp_id");
const  comp_id = localStorage.getItem("comp_id");
//console.log(cmp_id);

//const menuIcon = document.getElementById("menu-icon");
//const navLinks = document.getElementById("nav-links");

// document.getElementById("back").addEventListener("click", function(event){
//     event.preventDefault();
//    // menuIcon.style.display = "none";
//     navLinks.style.display = "none";
// })

async function fetchSections()
{
    // const res = await fetch("http://localhost:8080/section");
    // const secs = await res.json();
    // console.log("Secs ", secs );
    // secs.forEach( sec => {
    //     const option = document.createElement("option");
    //     option.value = sec.sec_id;
    //     option.textContent = sec.section;
    //     sections.appendChild(option);
    // });
    const responseSec = await fetch(`${address}/section`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({comp_id})
      });
    const secs = await responseSec.json();
    secs.forEach( sec => {
        const option = document.createElement("option");
        option.value = sec.sec_id;
        option.textContent = sec.section;
        sections.appendChild(option);
    });

}
document.addEventListener("DOMContentLoaded", fetchSections);

document.getElementById("section").addEventListener("click", function()
{
    const spotLabel = document.getElementById("spotLabel");
    spotLabel.textContent = "Section Name"
    btn.innerHTML = "Add Section";
    spotName.setAttribute("placeholder", "Please enter a section");
    sides.style.display = "none";
    //sideRight.style.display = "none";
   // sideRight.classList.add(".sides");
    sections.style.display = "none";
});
// const role = JSON.parse(localStorage.getItem("role"));
// if(role)
// {
//     console.log("role is ", role.role);
// }
document.getElementById("addSpotForm").addEventListener("submit", async function(event)
{
    event.preventDefault();

    const spotName = document.getElementById("spotName").value;
    const side = document.getElementsByName("side");
    let selectedSide = "";
    side.forEach((radio) => {
        if (radio.checked) {
            selectedSide = radio.value;
        }
    });
    let secV = sections.value;
    // alert("section is "+sections.value+"");
    // return;
  //  document.write(selectedValue);
   // document.write(spotName.value);

    try{
       // let compID = "1";
        if(btn.textContent === "Add Section")
        {
            console.log("it is section");
            const res = await fetch(`${address}/addSectoin`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({spotName, compID})
            });
            const result = await res.json();
            if(result.success)
            {
                alert("Section: "+spotName+" has been added");
                document.getElementById("addSpotForm").reset()
            }
        }
        else
        {
            const data = await Map();
            var lat = data[0];
            var long = data[1];
   
            const res = await fetch(`${address}/addSpot`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({spotName, selectedSide, secV, compID, lat, long})
            });
    
            const result = await res.json();
    
            if(result.success)
            {
                console.log("DONE");
                const labelMessage = document.getElementById("AddMessage");
                labelMessage.classList.add("addMessage");
                labelMessage.textContent = "The spot:"+result.message+" - "+spotName+" has been added";
            }
        }

    }catch(err){
        console.error("add spot error ", err);
    }

});

async function Map() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return [0, 0]; // Default return if geolocation is unsupported
    }

    try {
        // Wrap the geolocation call in a Promise
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        console.log("pre lat", lat);
        return [lat, long];
    } catch (error) {
        alert("Geolocation failed.");
        return [0, 0]; // Default return on error
    }
}
// async function getMap() {
//     const d = await Map();
//     console.log("lat", d[0]);
//     console.log("long", d[1]);
// }

// a();