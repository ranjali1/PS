async function fetchSpots(comp_id) {
  try {
  ///  const response = await fetch("http://localhost:8080/spot");
    const response = await fetch("http://localhost:8080/spot", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({comp_id})
    });
    const spots = await response.json();

    const responseSec = await fetch("http://localhost:8080/section", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({comp_id})
    });
    //const res = await fetch("http://localhost:8080/section");
    const secs = await responseSec.json();
   // console.log("Secs ", secs );
    // secs.forEach( sec => {
    //   console.log("sec id ", sec.sec_id);
    // });

   // const parkingGrid = document.getElementById("parkingGrid");
   const container = document.getElementById("container");
   container.innerHTML = "";
   secs.forEach( secs => 
   {
    const parkingGrid = document.createElement("div");
    parkingGrid.className = "parking-grid";
    parkingGrid.id = "parkingGrid" + secs.sec_id;
    //parkingGrid.innerHTML = "";
    parkingGrid.innerHTML = "";
    function createSide(title, spots, side) {
      const sideDive = document.createElement("div");
      sideDive.className == "left-side";

      const heading = document.createElement("h2");
      heading.textContent = "Section " + secs.section + " - "+ side + " side"; //title;
      sideDive.appendChild(heading);

      const spotContainer = document.createElement("div");
      spotContainer.className = "spot-container";
      spots.forEach((element) => {

        console.log("Sec id s ", secs.sec_id, " sec id element ", element.secId);
        if(element.side === side && element.secId == secs.sec_id) { 
          const spotButton = document.createElement("button");
          spotButton.className = "spot";
          if (element.status == 1) {
            spotButton.classList.add("unavailable");
          } else {
            spotButton.classList.add("available");
          }
          //spotButton.classList.add("available");
          spotButton.id = element.spot_id;
          if(localStorage.getItem("role") == "2"){
            spotButton.textContent = spotButton.id + ":" + element.spot_name;
          }
          else
          {
           // spotButton.textContent = element.spot_name;
            spotButton.textContent = element.spot_name;


          }
          spotContainer.appendChild(spotButton);
        }
      });

      sideDive.appendChild(spotContainer);
      return sideDive;
    }


    parkingGrid.appendChild(createSide("spots 1-10", spots,"Left"));
    parkingGrid.appendChild(createSide("spots 1-10", spots, "Right"));

    // const container = document.getElementById("container");
    // container.innerHTML = "";
    container.appendChild(parkingGrid);

   });//end for each

    //container.appendChild(parkingGrid);


    // fetchSpots();
  } catch (error) {
    console.error("eror fetching spots:", error);
  }
}

const eventSource = new EventSource("http://localhost:8080/events");

eventSource.onmessage = async function (event) {
  const spots = await JSON.parse(event.data);
  fetchSpots(localStorage.getItem("comp_id"));
  console.log("reloaded");
  // document.write(spots);
};
document.addEventListener("DOMContentLoaded", fetchSpots(localStorage.getItem("comp_id")));
