import { ControlPersoana } from "../controler/controlPersoana.js";
import { Home } from "./home.js";
import { MakeUser } from "./makeUser.js";


class Login{

    constructor() {
        this.ctrlpers = new ControlPersoana();
        this.listaPersoane=this.ctrlpers.listaPers;
        this.container = document.querySelector("main");
        this.container.innerHTML = ``;
        this.addLogin();

        this.submitBtn = document.querySelector(".submit");
        this.submitBtn.addEventListener("click", this.validUser);

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

    validUser = () => {
        let id = document.querySelector("#uid").value;
        let pas = document.querySelector("#pass").value;
        let accessI = this.ctrlpers.validIdPass(id, pas);
        switch (accessI) {
            case "0":
                console.log("uRAaaaaaaaaaaaaaaaaaaa");
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

}
export { Login };
