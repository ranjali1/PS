document.getElementById("loginForm").addEventListener("submit", async function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("email is ", email);
    try{
        const req = await fetch("http://localhost:8080/Login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const result = await req.json();
        if(result.success)
        {
            if(result.role == "2")
            {
                localStorage.setItem("role", result.role);
                window.location = "Dashboard.html";
            }
            else
            {
                localStorage.setItem("role", result.role);
                localStorage.setItem("comp_id", result.comp_id);
                window.location = "SpotDesignN.html";
            }
            //cmp
           // alert("correct "+result.role);
        }
        else
        {
            alert("smth went wrong. please try again");
        }
    }catch(err)
    {
        console.log("Login Err ", err);
    }

});