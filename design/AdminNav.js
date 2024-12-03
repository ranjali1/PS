// class NavigationBar extends HTMLElement {
//     connectedCallback() {
//        this.innerHTML = `
//        <head>
//            <link rel="stylesheet" href="NavStyle.css">
//        </head>
//              <button id="dash">Dashboard</button> <span> | </span>
//              <button id="addSpot">Add Spot</button> <span> | </span>
//              <button id="spots">Spots</button> <span> | </span>
//              <button id="section">Add Section</button> <span> | </span>
//              <button id="edit_spot">Edit Spot</button> <span> | </span>
//              <button>Edit Section</button> <span> | </span>
//              <button id="logout"> Logout </button> 
//        `;


//     //    document.getElementById("edit_section").addEventListener("click", function(){
//     //     const role = {
//     //         role:"user"
//     //     }
//     //     localStorage.setItem("role", JSON.stringify(role));
//     //    });


//     }
//  }
 
//  customElements.define("navigation-bar", NavigationBar);
 

const roleId = localStorage.getItem("role");
if(roleId != "2")
{
  const nav = document.getElementById("nav");
  nav.style.display = "none";
}
document.getElementById("logout").addEventListener("click", function(){
  localStorage.removeItem("comp_id");
  localStorage.removeItem("role");
  window.location.href = "./login.html";
})
document.getElementById("dash").addEventListener("click", function(){
  window.location.href = "./dashboard.html";
})
document.getElementById("addSpot").addEventListener("click", function(){
// const role = {
//     role:"admin"
// }
// localStorage.setItem("role", JSON.stringify(role));

  window.location.href = "./SpotAdmin.html";

});
document.getElementById("spots").addEventListener("click", function(){
  // const role = {
  //     role:"admin"
  // }
  // localStorage.setItem("role", JSON.stringify(role));
  
    window.location.href = "./SpotDesignV2.html";
  
  });