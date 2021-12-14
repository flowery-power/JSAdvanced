import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMemeById, editMeme } from "../api/data.js";
import { notify } from "../notification.js";

const editTemplate = (meme, onSubmit) => html`
  <section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
      <h1>Edit Meme</h1>
      <div class="container">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter Title"
          name="title"
          .value=${meme.title}
        />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
          .value=${meme.description}
        >
                            Programming is often touted as a smart and lucrative career path.
                            It's a job that (sometimes) offers flexibility and great benefits.
                            But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                            The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                            These memes cover most of the frustration (and funny moments) of programming.
                            At least we can laugh through the pain. 
                        </textarea
        >
        <label for="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter Meme ImageUrl"
          name="imageUrl"
          .value=${meme.imageUrl}
        />
        <input type="submit" class="registerbtn button" value="Edit Meme" />
      </div>
    </form>
  </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;
  const meme = await getMemeById(id);

  ctx.render(editTemplate(meme, onSubmit));

  async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const imageUrl = formData.get("imageUrl").trim();

    try {
      if (title == "" || description == "" || imageUrl == "") {
        throw new Error("Some fields are missing!");
      }

      await editMeme(id, {
        title,
        description,
        imageUrl,
      });

      ctx.page.redirect(`/details/${meme._id}`);
    } catch (err) {
      notify(err.message)
    }
  }
}
