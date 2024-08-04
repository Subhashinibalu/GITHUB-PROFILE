// Getting all the html elements
const userInput = document.getElementById("username");
const getDetailsButton = document.getElementById("getDetails");
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");
const info = document.getElementById("info");

//getting username from input and using async function to fetch the details from github
getDetailsButton.addEventListener("click", async () => {
  const userName = userInput.value;

  const res = await fetch(`https://api.github.com/users/${userName}`);

  const data = await res.json();

  getProfile(data);
  getRepo(userName);
});

//displaying the profile details after getting the username
function getProfile(data) {
  info.innerHTML = "";
  profile.innerHTML = `
  <div class="card text-white " id="pro">
  <div class="card-img  " id="propic">
  <img src=${data.avatar_url} alt=${data.name}>
  </div>
 <div class="card-body">
 <div class="card-title fs-4">${data.name}</div>
 <div class="card-subHeading text-white-50 fw-lighter fs-4">${data.login}</div>
  <button class="w-100 visit p-1 my-3">
  <a href=${data.html_url} target="_blank" class="text-decoration-none">View Profile </a>
  </button>
 <div class="card-text">
 
  
  <p class="fw-lighter text-white-50"><i class="fa-solid fa-user-group"></i> <span class="fw-bold text-white">${data.followers} </span>followers . <span class="fw-bold text-white">${data.following}</span> following </p>
  <p class="text-white-50">Created on: ${data.created_at} </p>
 
 </div>
 </div>
 </div> 
  `;
}

async function getRepo(userName) {
  const result = await fetch(`https://api.github.com/users/${userName}/repos`);

  const repository = await result.json();
  console.log(repository);
  for (let i = 0; i < repository.length; i++) {
    repo.innerHTML += `
     
   <div class="py-2">
   <h4 class="text-white reponame "><a href=${repository[i].html_url} target="_blank" class="text-decoration-none">${repository[i].name}</a><span id="visibility" class="text-white-50 text-capitalize">${repository[i].visibility}</span></h4>
   <p class="text-white-50 descr">${repository[i].description}</p>
    <p class="text-white-50">updated ${repository[i].created_at}</p>
<hr class="line" />
   </div>

    `;
  }
}
