import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/api.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myCarsPage } from "./views/myCars.js";
import { searchPage } from "./views/search.js";

const main = document.getElementById("site-content");
updateNav()

page("/", decorateContext, homePage)
page("/login", decorateContext, loginPage)
page("/register", decorateContext, registerPage)
page("/catalog", decorateContext, catalogPage)
page("/create", decorateContext, createPage)
page("/details/:id", decorateContext, detailsPage)
page("/edit/:id", decorateContext, editPage)
page("/myCars", decorateContext, myCarsPage)
page("/search", decorateContext, searchPage)

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout()
  updateNav()
  page.redirect("/")
})

page()

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.updateNav = updateNav;
  next();
}

function updateNav() {
  const username = sessionStorage.getItem("username");
  if (username != null) {
    document.querySelector("div#profile > a").textContent = `Welcome, ${username}`
    document.querySelector("#profile").style.display = "";
    document.querySelector("#guest").style.display = "none";
  } else {
    document.querySelector("#profile").style.display = "none";
    document.querySelector("#guest").style.display = "";
  }
}
