import { html } from "../../node_modules/lit-html/lit-html.js";
import { getData } from "../api/data.js";

const langTemplate = (data) => html`
  <section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
      <h2>JavaScript</h2>
      <article>
      ${data.filter(i => i.category == "JavaScript").length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` : data.filter(i => i.category == "JavaScript").map(i => iTemplate(i))}
      </article>
    </section>
    <section class="recent csharp">
      <h2>C#</h2>
      <article>
      ${data.filter(i => i.category == "C#").length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` : data.filter(i => i.category == "C#").map(i => iTemplate(i))}
      </article>
    </section>
    <section class="recent java">
      <h2>Java</h2>
      <article>
      ${data.filter(i => i.category == "Java").length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` : data.filter(i => i.category == "Java").map(i => iTemplate(i))}
      </article>
    </section>
    <section class="recent python">
      <h2>Python</h2>
      <article>
      ${data.filter(i => i.category == "Python").length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` : data.filter(i => i.category == "Python").map(i => iTemplate(i))}
      </article>
    </section>
  </section>
`;

const iTemplate = (item) => html`
    <h3>${item.title}</h3>
    <p>${item.content}</p>
    <a href="/details/${item._id}" class="btn details-btn">Details</a>
`;

export async function homePage(ctx) {
  const data = await getData();
  ctx.render(langTemplate(data));
}
