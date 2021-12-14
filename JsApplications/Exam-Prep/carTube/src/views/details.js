import { html } from "../../node_modules/lit-html/lit-html.js";
import { delCar, getCarById } from "../api/data.js";

const detailsTemplate = (car, isOwner, onDel) => html`
  <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
      <img src=${car.imageUrl} />
      <hr />
      <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
      </ul>

      <p class="description-para">${car.description}</p>

      <div class="listings-buttons">
        ${isOwner
          ? html` <a href="/edit/${car._id}" class="button-list">Edit</a>
              <a href="javascript:void(0)" class="button-list" @click=${onDel}
                >Delete</a
              >`
          : ""}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const car = await getCarById(id);

  const userId = sessionStorage.getItem("userId");
  const isOwner = userId == car._ownerId;

  ctx.render(detailsTemplate(car, isOwner, onDel));

  async function onDel() {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
      await delCar(car._id);
      ctx.page.redirect("/catalog");
    }
  }
}
