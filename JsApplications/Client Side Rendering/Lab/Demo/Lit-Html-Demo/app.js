//load articles
//generate article html using template (article file)
//render html file on page

import {html, render} from 'https://unpkg.com/lit-html?module';

const articleTemplate = (article) => html`
<article>
  <header>
    <h3>${article.title}</h3>
    <h4>Clicked: ${article.counter}</h4>
  </header>
  <div class="article-content">
  <p>${article.content}</p>
  </div>
  <footer>Author: ${article.output}</footer>
</article>
`

async function start(){
  const [articleData] =  await(await fetch("./articles.json")).json()
  articleData.counter = 0
  const main = document.getElementById("content")

  document.getElementById("button").addEventListener('click', onClick)

  function onClick(){
    articleData.counter += 1

    const article = articleTemplate(articleData)
    
    render(article, main)
  }
}

start()
