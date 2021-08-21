const APIURL = "https://api.github.com/users/";

async function getGitHubProfile(_user) {
  const urlText = APIURL + _user;
  const resp = await fetch(urlText);
  console.log(urlText);
  const respData = await resp.json();
  console.log(respData);
  bindGetHubData(respData);
 if(respData.length!=0){
  getRepos(_user);
console.log(respData.length,'respData.length');
}
}

async function getRepos(_user) {
  const urlText = APIURL + _user + "/repos";
  const resp = await fetch(urlText);
  console.log(urlText);
  const respData = await resp.json();
  binRepos(respData);
}
getGitHubProfile("essa-jamal");

const search = document.querySelector("input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getGitHubProfile(searchTerm);
    search.value='';
  } else {
    console("Term is null");
  }
});
function binRepos(_repos) {
  const reposEl = document.getElementById("repo");
  reposEl.classList.add('repo');
  _repos.sort((a,b)=>b-a).slice(0,10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.href = repo.html_url;
    repoEl.innerText = repo.name;
    repoEl.target = "_blank";
    reposEl.appendChild(repoEl);
  });

  console.log(_repos);
}
function bindGetHubData(_userProfile) {
  const gitHubCard = document.querySelector(".gitHubCard");
  const gitHubProfileContainer = document.createElement("div");
  gitHubProfileContainer.classList.add("profile-container");
  gitHubCard.innerHTML = "";
  gitHubProfileContainer.innerHTML = `
            <img
          src="${_userProfile.avatar_url}"
          alt="${_userProfile.name}"
        />
        <div class="profile-info">
          <h2>${_userProfile.name}</h2>
          <p>${_userProfile.bio}</p>
          <ul id="follower">
            <li>${_userProfile.followers}</li>
            <span>Followers</span>
            <li>${_userProfile.following}</li>
            <span>Followings</span>
            <li>${_userProfile.public_repos}</li>
            <span>Repos</span>
          </ul>
            <div id="repo">

            </div>
          
        </div> 
    `;
  gitHubCard.appendChild(gitHubProfileContainer);
}
