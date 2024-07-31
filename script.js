const API_LINK = "https://api.github.com/users";
const search_btn = document.querySelector(".search");
const search_term = document.getElementById("search-term");
const repoUl = document.getElementById("repo");
const searching = document.querySelector(".searching");
search_term.focus();
const repo = [];

search_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (search_term.value) {
    searching.innerHTML = "Searching...";
    try {
      const userDetails = await getUserDetails(
        `${API_LINK}/${search_term.value}`
      );
      const repos = await getRepoDetails(
        `${API_LINK}/${search_term.value}/repos`
      );
      showUserDetails(userDetails, repos);
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    } finally {
      searching.innerHTML = "";
    }
  } else {
    alert("Please enter any GitHub username");
    search_term.focus();
  }
});

function showUserDetails(userData, userRepos) {
  const box = document.querySelector(".box-body");
  const repoList = userRepos
    .map(
      (repo) =>
        `<a href="${repo.html_url}" target="_blank"><li>${repo.name}</li></a>`
    )
    .join("");
  box.innerHTML = `
    <div class="profile-box">
      <div class="row">
          <div class="image">
              <img src="${userData.avatar_url}" alt="">
          </div>
          <div class="about">
              <div class="details">
                  <h1 class="name">${userData.name}</h1>
                  <h3 class="username">@${userData.login}</h3>
                  <p class="country"><span><ion-icon name="location-sharp"></ion-icon></span>${
                    userData.location ? userData.location : "Unknown"
                  }</p>
              </div>
              <div class="btn-profile">
                  <a href="${
                    userData.html_url
                  }" target="_blank">Visit Profile</a>
              </div>
          </div>
      </div>
      <div class="bio">
          <h3>About</h3>
          <p>${
            userData.bio ? userData.bio : "Bio description is unavailable"
          }</p>
      </div>
      <div class="row-followers">
          <div class="col">
              <h3 class="heading">
                  Followers
              </h3>
              <p>${userData.followers}</p>
          </div>
          <div class="col">
              <h3 class="heading">
                  Following
              </h3>
              <p>${userData.following}</p>
          </div>
          <div class="col">
              <h3 class="heading">
                  Repos
              </h3>
              <p>${userData.public_repos}</p>
          </div>
      </div>
      <h3 class="repo-heading">Repositories</h3>
      <div class="respos-row">
          <ul id="repo">
            ${repoList}
          </ul>
      </div>
  </div>
    `;
}

async function getUserDetails(api) {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("User not found");
  }
  return response.json();
}

async function getRepoDetails(repo_api) {
  const response = await fetch(repo_api);
  if (!response.ok) {
    throw new Error("Repositories not found");
  }
  return response.json();
}
