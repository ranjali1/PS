async function fetchSpots(comp_id) {
    try {
    ///  const response = await fetch("http://localhost:8080/spot");
      const response = await fetch("http://localhost:8080/spot", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({comp_id})
      });
      const spots = await response.json();
  
      const spots_right = spots.filter((spotsF) =>
        spotsF.side.includes("Right") 
       );
      const spots_left = spots.filter((spotsF) =>
            spotsF.side.includes("Left")
        );
      const responseSec = await fetch("http://localhost:8080/section", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({comp_id})
      });
      //const res = await fetch("http://localhost:8080/section");
      const secs = await responseSec.json();
     console.log(spots_right);
     console.log(spots_left);
      console.log(secs);
      const parkingGrid = document.getElementById('parking-grid');
      parkingGrid.innerHTML = "";
      secs.forEach(section => {
        const spots_right_sec = spots_right.filter((spots_rightF) =>
            spots_rightF.secId.toString().includes(section.sec_id)
        );
        const spots_left_sec = spots_left.filter((spots_leftF) =>
          spots_leftF.secId.toString().includes(section.sec_id)
        );

        
      if(spots_right_sec.length > 0 && spots_left_sec.length > 0)
         { 
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('parking-section');
          
            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = "Section " + section.section;
            sectionDiv.appendChild(sectionTitle);
          
            const parkingArea = document.createElement('div');
            parkingArea.classList.add('parking-area');
          
            // First row of slots
            const firstRow = document.createElement('div');
            firstRow.classList.add('row');
            for (let i = 0; i < spots_right_sec.length; i++) {
              const slot = document.createElement('div');
              slot.classList.add('slot');
              slot.textContent =  spots_right_sec[i].spot_name;
              firstRow.appendChild(slot);
            }
            parkingArea.appendChild(firstRow);
          
            // Entry/Exit divider
            const divider = document.createElement('div');
            divider.classList.add('entry-exit-divider');
          
            const entry = document.createElement('div');
            entry.classList.add('entry');
            entry.innerHTML = `<span class="entry-label">Entry</span><div class="entry-arrow"></div>`;
            divider.appendChild(entry);
          
            const exit = document.createElement('div');
            exit.classList.add('exit');
            exit.innerHTML = `<div class="exit-arrow"></div><span class="exit-label">Exit</span>`;
            divider.appendChild(exit);
          
            parkingArea.appendChild(divider);
          
            // Second row of slots
            const secondRow = document.createElement('div');
            secondRow.classList.add('row');
            for (let i = 0; i < spots_left_sec.length; i++) {
              const slot = document.createElement('div');
              slot.classList.add('slot');
              slot.textContent = spots_left_sec[i].spot_name;
              secondRow.appendChild(slot);
            }
            parkingArea.appendChild(secondRow);
          
            sectionDiv.appendChild(parkingArea);
            parkingGrid.appendChild(sectionDiv);

         }
      });

      const viewMap = document.getElementById("viewMap");
      viewMap.addEventListener("click", function(event)
      {
        event.preventDefault();
        window.location.href = "./MapView.html";
      })
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
  