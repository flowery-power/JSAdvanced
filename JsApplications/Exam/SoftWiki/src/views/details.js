import { html } from "../../node_modules/lit-html/lit-html.js";
import { delArticle, getArticleById } from "../api/data.js";

const detailsTemplate = (article, isOwner, onDel) => html`
  <section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
      <strong>Published in category ${article.category}</strong>
      <p>${article.content}</p>

      <div class="buttons">
        ${isOwner
          ? html`<a @click=${onDel} href="javascript:void(0)" class="btn delete"
                >Delete</a
              >
              <a href="/edit/${article._id}" class="btn edit">Edit</a>`
          : ""}
        <a href="/" class="btn edit">Back</a>
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const article = await getArticleById(id);

  const userId = sessionStorage.getItem("userId");
  const isOwner = userId == article._ownerId;

  ctx.render(detailsTemplate(article, isOwner, onDel));

  async function onDel() {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
      await delArticle(article._id);
      ctx.page.redirect("/");
    }
  }
}
