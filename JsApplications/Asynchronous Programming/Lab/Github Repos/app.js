function loadRepos() {
  const username = document.getElementById("username").value;

  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then((response) => {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((data) => {
      const ulElement = document.getElementById("repos");
      ulElement.innerHTML = "";
      data.forEach((r) => {
        const liElement = document.createElement("li");
        liElement.textContent = r.full_name;
        ulElement.appendChild(liElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
