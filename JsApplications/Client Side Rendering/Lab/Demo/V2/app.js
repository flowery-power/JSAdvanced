//load articles
//generate article html using template (article file)
//render html file on page

import {renderTemplate} from "./engine.js"

async function start(){
  const articles =  await(await fetch("./articles.json")).json()
  const articleTemplate = await(await fetch("./article.html")).text() 

  const main = document.getElementById("content")

  main.innerHTML = articles.map(article => renderTemplate(articleTemplate, article)).join("")
}

start()