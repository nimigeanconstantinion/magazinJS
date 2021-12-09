import Persoana from "../model/persoana.js";

class ControlPersoana{

    constructor() {
        this.listaPersoane = [];
        this.load();
    }
    
    load = ()=>{
        this.listaPersoane = JSON.parse(localStorage.getItem("persoane"));
        console.log(this.listaPersoane.length);
    }

    addPersoana = (pers) => {
        console.log(pers);
        if (this.isPersoana(pers.id)==-1) {
            this.listaPersoane.push(pers);
        } else {
            console.log("pers exista in bd");
        }
    }

    delPers = (idp) => {
        let index = this.isPersoana(idp);
        if (index>=0) {
            this.listaPersoane.splice(index);
        }
    }

    isPersoana = (id) => {
        let persF = this.listaPersoane.filter(e => e.id === id)[0];
        if (persF) {
            return this.listaPersoane.indexOf(persF);

        }
        return -1;
    }

    save = () => {
        localStorage.setItem("persoane", JSON.stringify(this.listaPersoane)); //store colors
    }

    updPers = (p1,p2) => {
        this.delPers(p1.id);
        this.ad
    }

    validIdPass = (id, pass) => {
        let index = this.isPersoana(id);
        console.log("index =" + index);
        if (this.isPersoana(id) >= 0) {
            if (this.listaPersoane[index].parola === pass) {
                console.log("V-ati logat!!!");
                return "0";
            } else {
                console.log("Parola eronata!!!")
                return "1";
            }
        } else {
            console.log("id ul nu exista!!!!!");
            return "2";
        }
    }
}

export {ControlPersoana};