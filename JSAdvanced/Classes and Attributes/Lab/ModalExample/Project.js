class Modal {
  constructor(message) {
    this.message = message;
    this.element = this._initialize();
  }

  _initialize() {
    const container = e("div", e("p", this.message), button("OK", this.onClose.bind(this)));
    container.classList.add('modal')

    return container
  }

  onClose() {
    this.element.remove()
  }

  render(parent) {
    parent.appendChild(this.element)
  }
}

document.getElementById('createBtn').addEventListener("click", () => {
  const main = document.querySelector("main");
  const myModal = new Modal("It Works", main);
  myModal.render(main)
});

function button(label, callback) {
  const element = e('button', label)
  element.addEventListener('click', callback)
  return element
}

function e(type, ...content) {
  const result = document.createElement(type);
  content.forEach((e) => {
    if (typeof e == "string") {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });
  return result;
}
