import page from "//unpkg.com/page/page.mjs";

const pages = {
  "/home" : `<h2>Home Page</h2><p>Home page content</p>`,
  "/catalog" : `<h2>Catalog Page</h2><p>List of recent articles <a href="/catalog/123">Item 123</a></p>`,
  "/about" : `<h2>About us</h2><p>Contact information</p>`,
  "/buy" : `<h2>Thanky you for your purchase!</h2>`,
}
const defaultPage = `<h2>404</h2><p>Page Not Found</p>`

const main = document.querySelector("main")

page("/home", updateContent)
page("/catalog", updateContent)
page("/catalog/:id", itemDetails)
page("/about", updateContent)
page("/buy", updateContent)
page.start()

function updateContent(context){
  main.innerHTML = pages[context.pathname] || defaultPage
}

function itemDetails(context){
  const id = context.params.id
  const html = `<h2>Item ${id}</h2><p>Details for item ${id}</p>`
  main.innerHTML = html

  const btn = document.createElement("button")
  btn.textContent = "Buy"
  btn.addEventListener("click", () => {
    context.page.redirect("/buy")
  })
  main.appendChild(btn)
}
