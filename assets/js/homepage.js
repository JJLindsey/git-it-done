var getUsersRepos = function (user) {
    //format the githib api url
    var apiUrl = "http://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
        });
    });
};

console.log("outside");

getUsersRepos();