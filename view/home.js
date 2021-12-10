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
        this.loginBtn.addEventListener("click", this.loginClick);

        this.categBtn = document.querySelector("#categ");
        this.categBtn.addEventListener("click", this.categClick);

        this.priceBtn = document.querySelector("#pret");
        this.priceBtn.addEventListener("click", this.priceClick);

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
        let lst = lista;
        console.log("in lista cu n="+lst.length);
        lst.forEach(e =>  {
            console.log(lista.length);
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

    categClick = () => {
        console.log("in chcateg");
        let content = this.contentMain.innerHTML;
        this.contentMain.innerHTML = ``;
        let divctg = document.createElement("div");
        divctg.id = "chcateg";

        let h3 = document.createElement("h3");
        h3.textContent = "Alegeti o categorie";
        divctg.appendChild(h3);

        let sel = document.createElement("select");
        sel.id = "selctg";
        let listcateg = JSON.parse(localStorage.getItem("categorie"));
        let opt = document.createElement("option");
        opt.textContent = "Alegeti o categorie";
        opt.selected = true;
        opt.disabled = true;
        opt.hidden = true;
        sel.appendChild(opt);
        listcateg.forEach(e => {
            opt = document.createElement("option");
            opt.textContent = e;
            sel.appendChild(opt);
            
        })
        divctg.appendChild(sel);
        this.contentMain.appendChild(divctg);

        sel.addEventListener("change", ()=> {
            console.log("lkdlslnldlksdkl lkldk");
            let categorie = sel.options[sel.selectedIndex].text;
            console.log(categorie);
            this.contentMain.innerHTML = ``;
            this.addListtoMain(this.listaProduse.filter(e => e.categorie === categorie));
        })
    }

    priceClick = () => {
        let sorteList = this.listaProduse.sort((a, b) => { return a.pret - b.pret });
        console.log(sorteList[sorteList.length-1].pret);
    }


}

export { Home };