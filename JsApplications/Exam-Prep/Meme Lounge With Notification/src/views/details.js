import { html } from "../../node_modules/lit-html/lit-html.js";
import { delMeme, getMemeById } from "../api/data.js";

const detailsTemplate = (meme, isOwner, onDel) => html`
  <section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl} />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>

        ${isOwner
          ? html`
              <a class="button warning" href="/edit/${meme._id}">Edit</a>
              <button @click=${onDel} class="button danger">Delete</button>
            `
          : ""}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id; //because in app.js we named it id (row 24 and 25)
  const meme = await getMemeById(id);

  const userId = sessionStorage.getItem("userId");
  const isOwner = userId == meme._ownerId;

  ctx.render(detailsTemplate(meme, isOwner, onDel));

  async function onDel() {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
      await delMeme(meme._id);
      ctx.page.redirect("/catalog");
    }
  }
}
