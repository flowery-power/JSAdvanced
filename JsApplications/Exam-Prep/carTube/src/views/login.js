import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

const loginTemplate = (onSubmit) => html`
  <section id="login">
    <div class="container">
      <form id="login-form" action="#" method="post" @submit=${onSubmit}>
        <h1>Login</h1>
        <p>Please enter your credentials.</p>
        <hr />

        <p>Username</p>
        <input placeholder="Enter Username" name="username" type="text" />

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" />
        <input type="submit" class="registerbtn" value="Login" />
      </form>
      <div class="signin">
        <p>Dont have an account? <a href="/register">Sign up</a>.</p>
      </div>
    </div>
  </section>
`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return alert("All fields are required!");
    }

    await login(username, password)

    ctx.updateNav()
    ctx.page.redirect("/catalog")
  }
}
