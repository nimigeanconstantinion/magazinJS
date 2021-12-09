import { ControlProdus } from "../controler/controlProdus.js";
import { Login } from "./login.js";

class Home{

    constructor() {
        this.controlProdus = new ControlProdus();
        this.listaProduse = this.controlProdus.listaProduse;
        let body = document.querySelector("body");
        body.innerHTML = ``;
        this.container = document.createElement("div");
        this.container.className = "container home";
        body.appendChild(this.container);
        this.contentMain = document.createElement("div");
        this.contentMain.className = "main home";

        this.setHeader();
        this.setAside();
        this.setMain();
        this.setFooter();
        console.log("in constructor lista are " + this.listaProduse.length);
        this.addListtoMain(this.listaProduse);
       
        this.crd = document.querySelector(".container.home");
        this.crd.addEventListener("click", this.cosClick);
       
        this.homeBtn = document.querySelector("#home");
        this.homeBtn.addEventListener("click",this.homeClick)

        this.loginBtn = document.querySelector("#login");
        this.loginBtn.addEventListener("click",this.loginClick)

    }


    setHeader = () => {
        let header = document.createElement("header");
        let p = document.createElement("p");
        p.textContent = "OnLine STORE";
        header.appendChild(p);
        this.container.appendChild(header);

    }

    setAside = ()=>{
        let aside = document.createElement("aside");
        aside.className = "meniu";
        aside.innerHTML = `
        <input id="home" type="button" value="Home">
        <input id="categ" type="button" value="Categorie">
        <input id="pret" type="button" value="Pret">
        <input id="login" type="button" value="Login/Gestiune"> 
        
        `;
        this.container.appendChild(aside);


    }

    setMain = () => {
        let main = document.createElement("main");
        
        main.appendChild(this.contentMain);
        this.container.appendChild(main);
        
    }

    setFooter = () => {
        let footer = document.createElement("footer");
        this.container.appendChild(footer);
    }

    makeCard = (ob) => {
        let card=document.createElement("div");
        card.className="card produs";
        let avatar=document.createElement("img");
        avatar.id="avatar";
        avatar.src="https://via.placeholder.com/300x300.png?text="+ob.denumire+" "+ob.marca;
        card.appendChild(avatar);

        let inf=document.createElement("div");
        inf.className="info";
        let tit=document.createElement("h1");
        tit.textContent=ob.denumire+" "+ob.marca+" "+ob.tip;
        inf.appendChild(tit);

        let idp = document.createElement("p");
        idp.id="idp";
        idp.textContent=ob.idprod;
        inf.appendChild(idp);

        
        let categ = document.createElement("p");
        categ.id="categ";
        categ.textContent = "Categorie: ";
        let spanc = document.createElement("span");
        spanc.textContent = ob.categorie;
        categ.appendChild(spanc)
        inf.appendChild(categ);
        
        let detail = document.createElement("p");
        detail.id="info";
        detail.textContent="INFO: "+ob.info;
        inf.appendChild(detail);
       
        let stoc=document.createElement("p");
        stoc.id="stoc";
        stoc.textContent="Stoc: "+ob.stoc;
        inf.appendChild(stoc);

        let pret=document.createElement("p");
        pret.id="pret";
        pret.textContent = "Pret: ";
        let span = document.createElement("span");
        span.textContent = ob.pret;
        pret.appendChild(span)
        inf.appendChild(pret);


        
        
        card.appendChild(inf);
        
        let adcos = document.createElement("img");
        adcos.id="addcos";
        adcos.src = "/images/shopping-cart-svgrepo-com.svg";
       // adcos.addEventListener("click", this.cosClick);
        card.appendChild(adcos);
        
        return card;
    }

    addListtoMain = (lista) => {
        console.log("in lista cu n="+this.listaProduse.length);
        this.listaProduse.forEach(e =>  {
            console.log(this.listaProduse.length);
            console.log(e);
            this.contentMain.appendChild(this.makeCard(e));
        });
    }
    cosClick = (e) => {
        let ob = e.target;
        if (ob.id == "addcos") {
            let idProd = ob.previousSibling.querySelector("#idp").textContent;
            console.log(idProd);
        }
    }
    homeClick = () => {
        let listaCtg = JSON.parse(localStorage.getItem("categorie"));
        
        let hm = new Home();
    }
    loginClick = () => {
        let log = new Login();
    }
}

export { Home };