import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs"

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/api.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

const main = document.getElementById("main-content")

page("/", decoreateContext, homePage)
page("/login", decoreateContext, loginPage)
page("/register", decoreateContext, registerPage)
page("/catalog", decoreateContext,   )
page("/create", decoreateContext, createPage)
page("/details/:id", decoreateContext, detailsPage)
page("/edit/:id", decoreateContext, editPage)

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout()
  updateNav()
  page.redirect("/")
})

page.start()
updateNav()

function decoreateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.updateNav = updateNav;
  next();
}

function updateNav() {
  const userId = sessionStorage.getItem("userId");
  if (userId != null) {
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}
