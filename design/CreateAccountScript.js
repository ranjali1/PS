const fileInput = document.getElementById("file");

document.getElementById("AccountForm").addEventListener("submit", async function(event)
{
    event.preventDefault(); // Prevent the default form submission

    const compName = document.getElementById("CompanyName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const place = document.getElementById("place").value;

    // const formData = new FormData();
    // formData.append("file", fileInput);

    // Upload the file to the server
    try{
        if(place == -1)
        {
            alert("Please, select a place");
            return;
        }

        var img = await uploadFile();
        
        const res = await fetch("http://localhost:8080/Create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({compName, email, password, phone, place, img})
        });
        const result = await res.json();
        if(result.success)
        {
            alert("your account has been created successfully")
            document.getElementById("AccountForm").reset();
        }

    }catch(err)
    {
        console.log("create account err ", err)
    }
})

async function uploadFile() {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      // Prepare the file for upload
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        // Upload the file to the server
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        alert(`File uploaded successfully: ${data.filePath}`);
        return data.filePath; // Return the file path after a successful upload
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Rethrow the error if needed
      }
    }
  
    // Return null if no file was selected
    return 0;
  }
  

async function fetchPlace()
{
  try{
    const response = await fetch("http://localhost:8080/place");
    const pls = await response.json();

    const filter = document.getElementById("place");

   for (let ps of pls)
    {
      const option = document.createElement("option");
      option.value = ps.p_id;
      option.innerHTML = ps.p_name;
      filter.appendChild(option);
     //  console.log("id ", ps.p_id, "name ", ps.p_name);
   }

    
  }catch(err)
  {
    console.log("fetch place err ", err);
  }
}
fetchPlace();