import {html, render} from "../node_modules/lit-html/lit-html.js"
import {cats} from "./catSeeder.js"

const cardTemplate = (cat) => html`
<li>
  <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
  <div class="info">
  <button class="showBtn" @click=${onClick}>Show status code</button>
  <div class="status" style="display: none" id=${cat.id}>
      <h4>Status Code: ${cat.statusCode}</h4>
      <p>${cat.statusMessage}</p>
  </div>
  </div>
</li>
`

const section = document.getElementById("allCats")

const catsList = html`
<ul>
  ${cats.map(cardTemplate)}
</ul>`

render(catsList, section)

function onClick(event){
  const element = event.target.parentNode.querySelector(".status")
  if(element.style.display == "none"){
    element.style.display = "block"
  }else{
    element.style.display = "none"
  }
}