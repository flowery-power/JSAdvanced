import { html, render } from "../node_modules/lit-html/lit-html.js";

const listTemplate = (data) => html`
  <ul>
    ${data.map(t => html`<li>${t}</li>`)}
  </ul>
`;

document.getElementById("btnLoadTowns").addEventListener('click', startList)

function startList(event){
  event.preventDefault()
  const townsArr = document.getElementById("towns").value
  const root = document.getElementById("root")
  
  const towns = townsArr.split(",").map(x => x.trim())
  const result = listTemplate(towns)

  render(result, root)
}