import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "../src/api/data.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { profilePage } from "./views/profile.js";
import { notify } from "./notification.js";


const main = document.querySelector("main")
updateNav()

page("/", decorateContext, homePage)
page("/login", decorateContext, loginPage)
page("/register", decorateContext, registerPage)
page("/catalog", decorateContext, catalogPage)
page("/create", decorateContext, createPage)
page("/details/:id", decorateContext, detailsPage)
page("/edit/:id", decorateContext, editPage)
page("/profile", decorateContext, profilePage)

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout()
  updateNav()
  page.redirect("/")
})

page.start()

function decorateContext(ctx, next){
  ctx.render = (content) => render(content, main)
  ctx.updateNav = updateNav
  next()
}

function updateNav(){
  const email = sessionStorage.getItem("email")
  if(email != null){
    document.querySelector("div.profile > span").textContent = `Welcome, ${email}`
    document.querySelector(".user").style.display = ""
    document.querySelector(".guest").style.display = "none"
  }else{
    document.querySelector(".user").style.display = "none"
    document.querySelector(".guest").style.display = ""
  }
}