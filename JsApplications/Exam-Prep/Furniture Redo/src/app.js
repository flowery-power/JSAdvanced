import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { logout } from "./api/data.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myPage } from "./views/myFurniture.js";
import { registerPage } from "./views/register.js";

const main = document.querySelector(".container");

page("/", decoreateContext, dashboardPage);
page("/dashboard", decoreateContext, dashboardPage)
page("/login", decoreateContext, loginPage)
page("/register", decoreateContext, registerPage)
page("/create", decoreateContext, createPage)
page("/details/:id", decoreateContext, detailsPage)
page("/edit/:id", decoreateContext, editPage)
page("/my-furniture", decoreateContext, myPage)

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout()
  updateNav()
  page.redirect("/")
})

updateNav()
page.start()

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
