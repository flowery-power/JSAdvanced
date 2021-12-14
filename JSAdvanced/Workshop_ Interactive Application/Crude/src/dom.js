function e(type, attributes = {}, ...content) {
    const result = document.createElement(type);

    for (const attr in attributes) {
        if(attr.substr(0, 2) == "on"){
            result.addEventListener(attr.substr(2).toLocaleLowerCase(), attributes[attr])
        }else{
            result[attr] = attributes[attr]
        }
    }

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}