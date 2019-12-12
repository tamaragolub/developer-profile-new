const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

inquirer.prompt([
    {
        name: "username",
        type: "input",
        message: "What is your GitHub Username?"
    },
    {
        name: "color",
        type: "list",
        message: "What is your favorite color?",
        choices: ["red", "blue", "yellow", "green", "purple", "pink"]
    }

]).then(answers => {
    console.log(answers)

    const gitHubURL = "https://api.github.com/users/"

    let queryURL = gitHubURL + answers.username;

    console.log(queryURL);

    axios.get(queryURL).then(response => {


       let profilePic = response.data.avatar_url;
       let fullName = response.data.name;
       let url = response.data.html_url;
       let location = response.data.location;
       let bio = response.data.bio;
       let publicRepos = response.data.public_repos;
       let followers = response.data.followers;
       let following = response.data.following;
    

       let content = "![userImage](" + profilePic + ")" + "\n" + "Full Name: " + fullName + "\n" + "Location: " + location + "\n" + "Bio: " + bio + "\n" + "Repo URL: " + url + "\n" + "Public Repositories: " + publicRepos + "\n" + "Followers: " + followers + "\n" + "Following: " + following 



        fs.writeFile(answers.username + ".md", content, err =>{
            if (err) {
                return console.log(err)
            } 
            
            console.log("Success!");
        })

    }).catch(err => console.log(err));

}).catch(err => console.log(err)) 