const main = document.querySelector("main");
const title = document.querySelector("h1");

document.querySelector("nav").addEventListener("click", (ev) => {
  switch (ev.target.id) {
    case "home":
      title.textContent = "Home Page"
      main.innerHTML = "<p>Home page main content</p>"
      break;
    case "catalog":
      title.textContent = "Catalog"
      main.innerHTML = "<p>Catalog view: list of articles</p>"
      break;
    case "about":
      title.textContent = "About Us Page"
      main.innerHTML = "<p>Information about us and contact information</p>"
      break;
  }
});
