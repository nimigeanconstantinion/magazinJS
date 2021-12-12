
let f = () => {
    let div = document.createElement("div");
    div.id = "cardcos";
    let img = document.createElement("img");
    img.src = "https://via.placeholder.com/150x150.png?text=produs1";
    div.appendChild(img);
    let h = document.createElement("h3");
    h.textContent = "Denumire";
    div.appendChild(h);
    let stoc = document.createElement("p");
    stoc.textContent = "Stoc: 10 Buc";
    div.appendChild(stoc);

    let divrng = document.createElement("div");
    divrng.id = "myrange";
    
    let btnm = document.createElement("button");
    btnm.id = "cosminus";
    btnm.textContent = "-";
    divrng.appendChild(btnm);
    
    let nr = document.createElement("input");
    nr.type = "text";
    nr.id = "rngnr";
    nr.value = "10";
    divrng.appendChild(nr);

    let btnp = document.createElement("button");
    btnp.id = "cosplus";
    btnp.textContent = "+";
    divrng.appendChild(btnp);
    div.appendChild(divrng);
    return div;
}

let elm = f();
let body = document.querySelector("body");
body.appendChild(elm);
elm.addEventListener("click", (e) => {
    let textnr = document.querySelector("#rngnr");
    let nr = parseInt(textnr.value);
    let elm = e.target;

    console.log(e.target);
    let evntid = e.target.id;
    console.log(e.target.parentNode.parentNode.firstChild.nextSibling);
    switch (true) {
        case evntid == "cosplus":
            nr += 1;
            textnr.readOnly = false;
            textnr.value = nr;
            textnr.readOnly = true;
            break;
        case evntid == "cosminus":
            nr -= 1;
            textnr.readOnly = false;
            textnr.value = nr;
            textnr.readOnly = true;
            break;
    }


})