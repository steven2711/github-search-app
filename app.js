// Init Github
const github = new Github();

// Init UI
const ui = new UI();

async function getKeys() {
  const response = await fetch("github.json")
    .then(res => res.json())
    .catch(err => console.log(err));

  return response;
}

// Register service worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}

// Search input

const searchUser = document.getElementById("search-user");

// Add keyup listener

searchUser.addEventListener("keyup", e => {
  // Get input text

  const userText = e.target.value;

  if (userText !== "") {
    // Make http call

    github.getUser(userText).then(data => {
      if (data.profile.message === "Not Found") {
        // Show alert
        ui.showAlert("User does not exist!", "alert alert-danger");
        ui.clearProfile();
      } else {
        // Show profile
        ui.clearAlert();
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    // Clear profile

    ui.clearProfile();
  }
});
