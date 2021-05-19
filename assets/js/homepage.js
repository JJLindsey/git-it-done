//form element references
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//variables to ref DOM elements line 36, 37 display repo data
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUsersRepos = function (user) {
    //format the githib api url
    var apiUrl = "http://api.github.com/users/" + user + "/repos";

    //make a request to the url - send data from getUser to displayRepo
    fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        displayRepos(data, user);
        });
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();

//get value from input element
var username = nameInputEl.value.trim();

    if(username) {
        getUsersRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

//console.log("outside");

//function to display repos / send this to fetch callback in getUsersRepos
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append  issues Sattus to container
        repoEl.appendChild(statusEl);

        //append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);