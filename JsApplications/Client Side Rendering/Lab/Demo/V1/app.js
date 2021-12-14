//load articles
//generate article html using template (article file)
//render html file on page

import createArticle from "./article.js"

async function start(){
  const articles =  await(await fetch("./articles.json")).json()

  const main = document.getElementById("content")

  main.innerHTML = articles.map(createArticle).join("")
}

start()