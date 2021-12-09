import { ControlPersoana } from "../controler/controlPersoana.js";
import Persoana from "../model/persoana.js";
import { Home } from "./home.js";


class MakeUser{

    constructor() {
        this.ctrlpers = new ControlPersoana();
        this.listaPersoane=this.ctrlpers.listaPers;
        this.container = document.querySelector("main");
        this.container.innerHTML = ``;
        this.addForm();

        this.submitBtn = document.querySelector(".submit");
        this.submitBtn.addEventListener("click", this.validateUser);

    }

    addForm = () => {
      
        let containerForm = document.createElement("div");
        containerForm.className = "container mkuser";

        let form = document.createElement("form");
        form.className = "mkuserform";
        let fldset = document.createElement("fieldset");
        let legenda = document.createElement("legend");
        legenda.textContent = "Create User Form";
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


        lb1 = document.createElement("label");
        lb1.for = "nume";
        lb1.textContent = "Name";
        fldset.appendChild(lb1);

        fld1 = document.createElement("input");
        fld1.type = "text";
        fld1.name = "nume";
        fld1.id = "nume";
        fldset.appendChild(fld1);



        let lb2 = document.createElement("label");
        lb2.for = "adr";
        lb2.textContent = "Address";
        fldset.appendChild(lb2);

        let fld2 = document.createElement("textarea");
        
        fld2.name = "adr";
        fld2.id = "adr";
        fld2.cols = "30";
        fld2.rows = "6";
        fldset.appendChild(fld2);

        lb2 = document.createElement("label");
        lb2.for = "pass";
        lb2.textContent = "Password";
        fldset.appendChild(lb2);

        fld2 = document.createElement("input");
        fld2.type = "password";
        fld2.name = "pass";
        fld2.id = "pass";
        fldset.appendChild(fld2);



        let fld3 = document.createElement("input");
        fld3.type = "button";
        fld3.className = "submit";
        fld3.value = "Add User";
        fldset.appendChild(fld3);
    
        form.appendChild(fldset);
        containerForm.appendChild(form);
        this.container.appendChild(containerForm);

    }

    validateUser = () => {
        let id = document.querySelector("#uid").value;
        let pas = document.querySelector("#pass").value;
        console.log("la validare");
        let index = this.ctrlpers.isPersoana(id);
        console.log("indexul estw" + index);
        if (index == -1) {
            let id = document.querySelector("#uid").value;
            let nume = document.querySelector("#nume").value;
            let adresa = document.querySelector("#adr").value;
                    let categ = 0;
            let pass = document.querySelector("#pass").value;
            let client = new Persoana(id, nume, adresa, categ, pas);
            this.ctrlpers.addPersoana(client);
            this, this.ctrlpers.save();
        }
    }

}
export { MakeUser };
