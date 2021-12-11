import { ControlOrder } from "../controler/controlOrder.js";
import { ControlOrderDetails } from "../controler/controlOrderDetail.js";
import { ControlPersoana } from "../controler/controlPersoana.js";
import { ControlProdus } from "../controler/controlProdus.js";
import { Cos } from "../model/cos.js";
import { Home } from "./home.js";
import { MakeUser } from "./makeUser.js";


class Login{

    constructor() {
        this.ctrlpers = new ControlPersoana();
        this.contrOrder = [];
        this.contrOrderDet = [];
        this.listaPersoane=this.ctrlpers.listaPers;
        this.container = document.querySelector("main");
        
        this.container.innerHTML = ``;
        this.idClient = "";
        this.idOrder = "";
        this.addLogin();
        this.cosDetails = [];
        this.btnCos = {};
        this.btnComenzi = {};
        this.submitBtn = document.querySelector(".submit");
        this.submitBtn.addEventListener("click", this.validUser);

        this.crd = document.querySelector("main");
        this.crd.addEventListener("click", this.cosClk);
    }



    addLogin = () => {
      
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
        fld3.className = "submit";
        fld3.value = "Submit";
        
        fldset.appendChild(fld3);
        form.appendChild(fldset);
        containerForm.appendChild(form);
        this.container.appendChild(containerForm);




    }

    makeCardProd = (ob) => {
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



    chMenu = () => {
        

    }

    showStoc = () => {
        

    }
    
    
    validUser = () => {
        let id = document.querySelector("#uid").value;
        let pas = document.querySelector("#pass").value;
        let accessI = this.ctrlpers.validIdPass(id, pas);
        switch (accessI) {
            case "0":
                console.log("uRAaaaaaaaaaaaaaaaaaaa");
                let aside = document.querySelector("aside");
                let containerM = document.querySelector("main");
                this.idClient = id;
                
                containerM.innerHTML = ``;

                    
                aside.innerHTML = ``;
                aside.innerHTML = `
                <input id="home" type="button" value="Home">

                <input id="cos" type="button" value="Cosul meu">
                <input id="comenzi" type="button" value="Comenzile mele">
                    `;
                 this.btnHome = document.querySelector("#home");
                 this.btnHome.addEventListener("click", this.btnHomeClick);
    
                
                this.btnCos = document.querySelector("#cos");
                this.btnCos.addEventListener("click", this.btnCosClick);

                break;
            case "1":
                console.log("pass error");
                document.querySelector("#pass").value = "";
                break;
            case "2":
                let mku = new MakeUser();
                break;
        }
    }
    mkCardCos = () => {
        
    }

    btnCosClick = () => {
        
        this.contrOrder = new ControlOrder(this.idClient);
        
        let indexCos = this.contrOrder.isOrderActive(this.idClient);
        if (indexCos != -1) {
            let cos = this.contrOrder.listOrders[indexCos];
            this.contrOrderDet = new ControlOrderDetails(cos.orderId); 
            console.log(cos);
            console.log(this.contrOrderDet.listDetails);
        }
    }
    btnHomeClick = (idc) => {
        localStorage.setItem("who", this.idClient);
        this.controlProd = new ControlProdus();
        this.controlProd.listaProduse.forEach(e => {
            this.container.appendChild(this.makeCardProd(e));
        })
    }
    cosClk = (e) => {
        if (e.target.id == "addcos") {
            console.log("in lllklkjljlw");
            let ob = e.target;
            let idPr = ob.previousSibling.querySelector("#idp").textContent;
            console.log(idPr);
            this.cosDetails = JSON.parse(localStorage.getItem("cos"));
            let det = {};
            if (this.cosDetails.length > 0 || this.cosDetails.filter(e=>e.idProd===idPr).length>0) {
                det = new Cos(idPr, 1);
            } else {
                this.cosDetails = [];
                det = new Cos(idPr,1);
            }
            this.cosDetails.push(det);
            localStorage.setItem("cos", JSON.stringify(this.cosDetails));
        }
    }
}
export { Login };
