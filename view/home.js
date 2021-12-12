import { ControlPersoana } from "../controler/controlPersoana.js";
import { ControlProdus } from "../controler/controlProdus.js";
import { Login } from "./login.js";
import { Cos } from "../model/cos.js";
import Persoana from "../model/persoana.js";

class Home {

    constructor() {
        this.controlProdus = new ControlProdus();
        this.controlPersoana = new ControlPersoana();
        this.listaProduse = this.controlProdus.listaProduse.filter(e => e.stoc > 0);
        this.client = new Persoana();
        this.cos = [];

        let body = document.querySelector("body");
        body.innerHTML = ``;

        this.header = document.createElement("header");
        body.appendChild(this.header);
        
        this.aside = document.createElement("aside");
        this.aside.className = "meniu";
        body.appendChild(this.aside);

        this.main = document.createElement("main");
        body.appendChild(this.main);

        this.footer = document.createElement("footer");
        body.appendChild(this.footer);

        // this.container = document.createElement("div");
        // this.container.className = "container home";
        //  body.appendChild(this.container);
        // this.contentMain = document.createElement("div");
        // this.contentMain.className = "main home";
        ////
        this.emptyTmp();
        this.setHeader();
        this.setAside("home");
        this.setMain();
        this.setFooter();

        this.addListtoMain(this.listaProduse);


        this.aside.addEventListener("click", this.meniuClick);
        this.main.addEventListener("click", this.mainClick);
 
        //////////////////// 
        // this.crd = document.querySelector(".container.home");
        // this.crd.addEventListener("click", this.cosClick);
       
        // this.homeBtn = document.querySelector("#h_home");
        // this.homeBtn.addEventListener("click",this.homeClick)

        // this.loginBtn = document.querySelector("#h_login");
        // this.loginBtn.addEventListener("click", this.loginClick);

        // this.categBtn = document.querySelector("#h_categ");
        // this.categBtn.addEventListener("click", this.categClick);

        // this.priceBtn = document.querySelector("#h_pret");
        // this.priceBtn.addEventListener("click", this.priceClick);

        // this.meniu = document.querySelector("aside");
        //this.meniu.addEventListener("click", this.meniuClick);
    }


    setHeader = () => {
        this.header.innerHTML = ``;
        let p = document.createElement("p");
        p.textContent = "OnLine STORE";
        this.header.appendChild(p);
    }

    setAside = (menu) => {
        this.aside.innerHTML = ``;
        switch (menu) {
            case "home":
                console.log("in meniu home");
                this.aside.innerHTML = `
                <input id="h_home" type="button" value="Home">
                <input id="h_categ" type="button" value="Categorie">
                <input id="h_pret" type="button" value="Pret">
                <input id="h_login" type="button" value="Login/Gestiune"> 
                `;

                break;
            case "client":
                this.aside.innerHTML = `
                <input id="c_home" type="button" value="Home">
                <input id="c_refresh" type="button" value="Refresh List">

                <input id="c_categ" type="button" value="Categorie">
                <input id="c_pret" type="button" value="Pret">

                <input id="c_cos" type="button" value="Cosul meu">
                <input id="c_comenzi" type="button" value="Comenzile mele">
                <input id="c_fincomanda" type="button" value="Finalizare Comanda">
 
                `;
        
                
        }
        //         //this.container.appendChild(aside);
        //         //this.meniu = document.querySelector("aside");
        //        /// this.meniu.addEventListener("click", this.meniuClick);

    }

    setMain = () => {
        //let main = document.createElement("main");
        //this.main.appendChild(this.contentMain);
        //this.container.appendChild(main);
        
    }

    setFooter = () => {
    }

    makeCard = (ob) => {
        let card = document.createElement("div");
        card.className = "card produs";
        let avatar = document.createElement("img");
        avatar.id = "avatar";
        avatar.src = "https://via.placeholder.com/300x300.png?text=" + ob.denumire + " " + ob.marca;
        card.appendChild(avatar);

        let inf = document.createElement("div");
        inf.className = "info";
        let tit = document.createElement("h1");
        tit.textContent = ob.denumire + " " + ob.marca + " " + ob.tip;
        inf.appendChild(tit);

        let idp = document.createElement("p");
        idp.id = "idp";
        idp.textContent = ob.idprod;
        inf.appendChild(idp);

        
        let categ = document.createElement("p");
        categ.id = "categ";
        categ.textContent = "Categorie: ";
        let spanc = document.createElement("span");
        spanc.textContent = ob.categorie;
        categ.appendChild(spanc)
        inf.appendChild(categ);
        
        let detail = document.createElement("p");
        detail.id = "info";
        detail.textContent = "INFO: " + ob.info;
        inf.appendChild(detail);
       
        let stoc = document.createElement("p");
        stoc.id = "stoc";
        stoc.textContent = "Stoc: " + ob.stoc;
        inf.appendChild(stoc);

        let pret = document.createElement("p");
        pret.id = "pret";
        pret.textContent = "Pret: ";
        let span = document.createElement("span");
        span.textContent = ob.pret;
        pret.appendChild(span)
        inf.appendChild(pret);


        
        
        card.appendChild(inf);
        
        let adcos = document.createElement("img");
        adcos.id = "addcos";
        adcos.src = "/images/shopping-cart-svgrepo-com.svg";
        // adcos.addEventListener("click", this.cosClick);
        card.appendChild(adcos);
        
        return card;
    }

    mkCardCos = (ob) => {
        let div = document.createElement("div");
        div.id = "cardcos";
        let idp = document.createElement("p");
        idp.id = "cosidprod";
        idp.textContent = ob.idProd;
        div.appendChild(idp);
        let prod = this.controlProdus.getProdus(ob.idProd);
        console.log(prod);
        let stoc = this.controlProdus.getStoc(ob.idProd);
        let img = document.createElement("img");
        img.src = "https://via.placeholder.com/150x150.png?text="+prod.denumire+" "+prod.marca;
        div.appendChild(img);
        let h = document.createElement("h3");
        h.textContent = prod.denumire+" "+prod.marca;
        div.appendChild(h);

        let stk = document.createElement("p");
        stk.textContent = "Stoc: "+stoc+" Buc";
        div.appendChild(stk);
    
        let divrng = document.createElement("div");
        divrng.id = "myrange";
        
        let btnm = document.createElement("button");
        btnm.id = "cosminus";
        btnm.textContent = "-";
        divrng.appendChild(btnm);
        
        let nr = document.createElement("input");
        nr.type = "text";
        nr.id = "rngnr";
        nr.value = ob.cant;
        divrng.appendChild(nr);
    
        let btnp = document.createElement("button");
        btnp.id = "cosplus";
        btnp.textContent = "+";
        divrng.appendChild(btnp);
        div.appendChild(divrng);
        return div;        
    }

    addListtoMain = (lista) => {
        let lst = lista;
        console.log("in lista cu n=" + lst.length);
        let cntmain = document.createElement("div");
        cntmain.className = "main home";

        lst.forEach(e => {
            console.log(lista.length);
            console.log(e);
            cntmain.appendChild(this.makeCard(e));
        });
        this.main.appendChild(cntmain);
    }

    cosClick = (e) => {
        let ob = e.target;
        let idPr = ob.previousSibling.querySelector("#idp").textContent;
        console.log("id produs=" + idPr);
        this.updcos(idPr, 1);
        // let det = {};
        // if (this.cosDetails.length > 0 && this.cosDetails.filter(e => e.idProd === idPr).length > 0) {
           
        //     det = this.cosDetails.filter(e => e.idProd === idPr)[0];
        //     this.cosDetails.splice(this.cosDetails.indexOf(det), 1);
        //     det.cant += 1;

        // } else {
           
        //     det = new Cos(idPr, 1);
        // }
        // this.cosDetails.push(det);
        // localStorage.setItem("cos", JSON.stringify(this.cosDetails));
        this.mkHeaderInfo(this.client, this.cosDetails);
    }

    //     homeClick = () => {
    //         let listaCtg = JSON.parse(localStorage.getItem("categorie"));
        
    //         let hm = new Home();
    //     }

    //     loginClick = () => {
    //         console.log(",masllkaslklasmlkamslmalsklklkjl dlsd");
    //         this.mkLoginForm();


    //     }

    categClick = () => {
        console.log("in chcateg");
        let content = this.main.innerHTML;
        this.main.innerHTML = ``;
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
        this.main.appendChild(divctg);

        sel.addEventListener("change", () => {
            console.log("lkdlslnldlksdkl lkldk");
            let categorie = sel.options[sel.selectedIndex].text;
            console.log(categorie);
            this.main.innerHTML = ``;
            this.listaProduse = this.listaProduse.filter(e => e.categorie === categorie);
            this.addListtoMain(this.listaProduse);
        })
    }
    

    //     priceClick = () => {
    //         let sortedList = this.listaProduse.sort((a, b) => { return a.pret - b.pret });
        
    //         let maxPrice = sortedList[sortedList.length - 1].pret;
    //         let content = this.contentMain.innerHTML;
    //         this.contentMain.innerHTML = ``;
        
    //         let divctg = document.createElement("div");
    //         divctg.id = "chprice";

    //         let h3 = document.createElement("h3");
    //         h3.textContent = "Alegeti un interval de pret";
    //         divctg.appendChild(h3);

    //         let sel = document.createElement("input");
    //         sel.type = "range";
    //         sel.id = "rngpret";
    //         sel.min = 0;
    //         sel.max = maxPrice;
    //         sel.value = maxPrice;
    //         divctg.appendChild(sel);
    //         this.contentMain.appendChild(divctg);

    //         sel.addEventListener("change", ()=> {
    //             console.log("lkdlslnldlksdkl lkldk");
    //             let valCrt = sel.value;
    //             console.log(valCrt);
    //             this.contentMain.innerHTML = ``;
    //             this.addListtoMain(this.listaProduse.filter(e => e.pret>0&&e.pret<=valCrt));
    //         })
 
        
    //     }


    mkLoginForm = () => {
        console.log("creare lofin fotm");
        this.main.innerHTML = ``;
        let containerForm = document.createElement("div");
        containerForm.className = "container login";

        let form = document.createElement("form");
        form.className = "loginform";
        let fldset = document.createElement("fieldset");
        let legenda = document.createElement("legend");
        legenda.textContent = "Login Form";
        fldset.appendChild(legenda);
     
        let lb1 = document.createElement("label");
        lb1.for = "uid";
        lb1.textContent = "User ID";
        fldset.appendChild(lb1);

        let fld1 = document.createElement("input");
        fld1.type = "text";
        fld1.name = "uid";
        fld1.id = "uid";
        fldset.appendChild(fld1);

        let lb2 = document.createElement("label");
        lb2.for = "pass";
        lb2.textContent = "Password";
        fldset.appendChild(lb2);

        let fld2 = document.createElement("input");
        fld2.type = "password";
        fld2.name = "pass";
        fld2.id = "pass";
        fldset.appendChild(fld2);

        let fld3 = document.createElement("input");
        fld3.type = "button";
        fld3.id = "loginsubmit"
        fld3.className = "submit";
        fld3.value = "Submit";
        
        fldset.appendChild(fld3);
        form.appendChild(fldset);
        containerForm.appendChild(form);
        this.main.appendChild(containerForm);
        // let btLogin = document.querySelector(".container.login .submit");

        // btLogin.addEventListener("click", (e) => {
        //     console.log(e.target);
        //     // let aside = document.querySelector("aside");
        //     // aside.innerHTML = ``;
        //    //  this.setAside("client");
        //    //// this.validUser();
        // })



    }

    validUser = () => {
        let id = document.querySelector("#uid").value;
        let pas = document.querySelector("#pass").value;
        let accessI = this.controlPersoana.validIdPass(id, pas);
        
        switch (accessI) {
            case "0":
                console.log("uRAaaaaaaaaaaaaaaaaaaa");
                this.idClient = id;
                let div = document.querySelector(".container.login");
                console.log(div);
                div.style.transform = "translate(0px,300px)";

                div.style.opacity = 0;
                this.aside.style.disabled = true;

                setTimeout(function () {
                    div.style.display = "none";
                }, 2000);

                this.setAside("client");
                setTimeout(() => {
                    this.addListtoMain(this.listaProduse);
              
                }, 2200);

                setTimeout(() => {
                    this.aside.style.disabled = false;
              
                }, 2200);

                localStorage.setItem("who", JSON.stringify(this.idClient));
                
                this.client = this.controlPersoana.listaPersoane[this.controlPersoana.isPersoana(this.idClient)];
                this.mkHeaderInfo(this.client, this.cosDetails);
                break;
            case "1":
                console.log("pass error");
                document.querySelector("#pass").value = "";
                break;
            case "2":
                //let mku = new MakeUser();
                break;
        }
    }
    
    
    meniuClick = (e) => {
        console.log(e.target);
        let cmdBt = e.target.id;
        console.log("id element=" + cmdBt);
        switch (true) {
            case cmdBt == "h_home":
                let hm = new Home();
                break;
            case cmdBt == "c_home":
                let lm = new Home();
                break;
            case cmdBt == "h_categ" || cmdBt == "c_categ":
                this.categClick();
                break;
            case cmdBt == "h_pret":
                this.categClick();
                break;
   
             
            case cmdBt == "h_login":
                this.mkLoginForm();
                break;
            
            case cmdBt == "c_cos":
                    this.showCos();
                    break;

        }
    };

    mainClick = (e) => {
        console.log(e.target);
        let cmdId = e.target.id;
       
        switch (cmdId) {
            case "loginsubmit":
                //                 this.setAside("client");
                console.log("sunt la validare user");
                this.validUser();
                break;
            case "addcos":
                this.cosClick(e);
                break;
            case "cosplus":
                this.modcos(e);
                break;
            case "cosminus":
                this.modcos(e);
                break;
        }

    }

    emptyTmp = () => {
        let usr = "";
        let cos = [];
        localStorage.setItem("who", JSON.stringify(usr));
        localStorage.setItem("cos", JSON.stringify(cos));
    }

    mkHeaderInfo = (user, basket) => {
        let elm = document.querySelector(".logininfo");
        if (elm !== undefined&&elm!==null) {
            console.log(elm);
            elm.parentNode.removeChild(elm);
                    
            
        }
        let div = document.createElement("div");
        div.className = "logininfo";
        let usr = document.createElement("p");
        
        console.log(user);
        if ( user !== undefined) {
            if (user.categorie ==0) {
                usr.textContent = "Client: " + user.nume;
            } else if (user.categorie == 1) {
                usr.textContent = "Tehnic: " + user.nume;
            }
            div.appendChild(usr);
                
        }
        if (basket.length > 0) {
            let cos = document.createElement("p");
            let n = basket.map(e=>e.cant).reduce((a, b) => a + b);
            cos.textContent = "Cos: " + n + " items";
            div.appendChild(cos);
        }
        this.header.appendChild(div);
    }

    showCos = () => {
        console.log("sunt in show cos");
        this.main.innerHTML = ``;
        let divContainer = document.createElement("div");
        divContainer.className = "spacecos";
        this.cosDetails.forEach(e => {
            
            let card= this.mkCardCos(e);
            divContainer.appendChild(card);
        })
        this.main.appendChild(divContainer);
    }

    modcos = (e) => {
        
        let elm = e.target;
        let textnr=e.target.parentNode.firstChild.nextElementSibling;
        let nr = parseInt(textnr.value);

        let idp=e.target.parentNode.parentNode.firstChild.textContent;
        let evntid = e.target.id;
        switch (true) {
            case evntid == "cosplus":
                nr += 1;
                this.updcos(idp, 1);
                textnr.readOnly = false;
                textnr.value = nr;
                textnr.readOnly = true;
                break;
            case evntid == "cosminus":
                nr -= 1;
                this.updcos(idp, -1);
                textnr.readOnly = false;
                textnr.value = nr;
                textnr.readOnly = true;
                break;
        }
        this.mkHeaderInfo(this.client, this.cosDetails);
   
    
    }

    updcos = (idp,q) => {
        this.cosDetails = JSON.parse(localStorage.getItem("cos"));
        let det = {};
        if (this.cosDetails.length > 0 && this.cosDetails.filter(e => e.idProd === idp).length > 0) {
           
            det = this.cosDetails.filter(e => e.idProd === idp)[0];
            this.cosDetails.splice(this.cosDetails.indexOf(det), 1);
            det.cant += q;

        } else {
           
            det = new Cos(idp, 1);
        }
        this.cosDetails.push(det);
        localStorage.setItem("cos", JSON.stringify(this.cosDetails));        
    }
}
export { Home };