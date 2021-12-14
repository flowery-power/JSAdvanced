function attachEvents() {
    let loadBtn = document.getElementById("btnLoad")
    let createBtn = document.getElementById("btnCreate")
    let personInput = document.getElementById("person")
    let phoneInput = document.getElementById("phone")
    let phonebookUl = document.querySelector('#phonebook');

    const url = "http://localhost:3030/jsonstore/phonebook/"

    loadBtn.addEventListener("click", loadContacts)
    createBtn.addEventListener("click", createContact)

    async function loadContacts(){
        phonebookUl.innerHTML = ""
        const response = await fetch(url)
        const data = await response.json()

        Object.entries(data).forEach(([id, phoneData]) => {
            if(id && phoneData){
                const phone = phoneData.phone
                const person = phoneData.person
                console.log(phone)
                let li = document.createElement("li")
                li.textContent = `${person}: ${phone}`

                let delBtn = document.createElement("button")
                delBtn.textContent = 'Delete'
                delBtn.setAttribute('data-target', id);
                delBtn.addEventListener('click', delPhonebook);

                li.appendChild(delBtn)
                phonebookUl.appendChild(li)
            }
        })
    }

    async function createContact(){
        let person = personInput.value
        let phone = phoneInput.value
        let header = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        }

        const response = await fetch(url, header)
        const data = await response.json()
        console.log(data)
        loadContacts()
    }

    async function delPhonebook(){
        let phoneId = this.getAttribute("data-target")

        let header = {
            method: 'DELETE'
        }

        await fetch(url + phoneId, header)
        loadContacts()
    }
}

attachEvents();