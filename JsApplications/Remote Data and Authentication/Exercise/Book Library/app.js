async function request(url, options){
  const response = await fetch(url, options)
  if(response.ok !== true){
    const error = await response.json()
    alert(error.message)
    throw new Error(error.message)
  }
  const data = await response.json()
  return data
}

//function to load all books from the server and display them
async function getAllBooks(){
  const books = await request("http://localhost:3030/jsonstore/collections/books")
  
  const rows = Object.entries(books).map(createRow).join("")
  document.querySelector("tbody").innerHTML = rows
}

function createRow([id, book]){
  const result = `
  <tr data-id="${id}"> 
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    </td>
  </tr>
  `
  return result
}

//function for creating new books
async function createBook(event){
  event.preventDefault()
  const formData = new FormData(event.target)

  const book = {
    title: formData.get("title"),
    author: formData.get("author")
  }

  await request("http://localhost:3030/jsonstore/collections/books", {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(book)
  })

  event.target.reset()
  getAllBooks()
}

//function for updating existing books using ID
async function updateBook(event){
  event.preventDefault()
  const formData = new FormData(event.target)
  const id = formData.get("id")
  const book = {
    title: formData.get("title"),
    author: formData.get("author")
  }

  await request("http://localhost:3030/jsonstore/collections/books/" + id, {
    method: "put",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(book)
  })

  document.getElementById("createForm").style.display = "block"
  document.getElementById("editForm").style.display = "none"
  event.target.reset()
}

//function for deleting existing books using ID
async function deleteBook(id){
  await request("http://localhost:3030/jsonstore/collections/books/" + id, {
    method: "delete"
  })
  getAllBooks()
}

//main function
function start(){
  //event listener on the load button
  document.getElementById("loadBooks").addEventListener("click", getAllBooks)
  
  //event listener on the create button
  document.getElementById("createForm").addEventListener("submit", createBook)
  
  //program logic for updateing the input form and filling existing values (on edit)
  document.getElementById("editForm").addEventListener("submit", updateBook)
  
  //event listners on the delete buttons
  document.querySelector("table").addEventListener("click", handTableClick)
  
  //program logic to reverse above changes to form
  getAllBooks()
}

start()

function handTableClick(event){
  if(event.target.className == "editBtn"){
    document.getElementById("createForm").style.display = "none"
    document.getElementById("editForm").style.display = "block"

    const bookId = event.target.parentNode.parentNode.dataset.id
    loadBookForEditting(bookId)
  }else if(event.target.className == "deleteBtn"){
    const confirmed = confirm("Are you sure you want to delete this book?")
    if(confirmed){
      const bookId = event.target.parentNode.parentNode.dataset.id
      deleteBook(bookId)
    }
  }
}

async function loadBookForEditting(id){
  const book = await request("http://localhost:3030/jsonstore/collections/books/" + id)

  document.querySelector('#editForm [name="id"]').value = id
  document.querySelector('#editForm [name="title"]').value = book.title
  document.querySelector('#editForm [name="author"]').value = book.author
}
