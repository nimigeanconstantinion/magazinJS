import { Produs} from "../model/produs.js";

class ControlProdus{

    constructor() {
        this.listaProduse = [];
        this.load();
        
    }

    load = () => {
    
        this.listaProduse = JSON.parse(localStorage.getItem("produse"));
    }
    
    addProdus = (p) => {
   
        if (!this.isProdus(p)) {
         
            let cod = "";
            let brk = false;
            while (brk == false) {
                cod = p.genId();
                brk = this.validcod(cod);

            }
            p.idprod = cod;
            this.listaProduse.push(p);

        }
    }

    getProdusId = (idp) => {
        return this.listaProduse.filter(e => e.idprod == idp);
    }
    
    getMaxPrice = () => {
        this.listaProduse.sort((a, b) => { return a.pret - b.pret; });
        return this.listaProduse[this.listaProduse.length - 1].pret;
    }

    getListaStoc = () => {
        return this.listaProduse.filter(e => e.stoc > 0);
    }
    
    loadStoc = () => {
        return this.listaProduse.filter(e => e.stoc > 0);
    }

    isProdus = (p1) => {
        let is = false;
        
        this.listaProduse.forEach(e => {
            if (p1.isEqual(e)==true) {
                is = true;
           } 
        });
        return is;
    }

    getProdus=(idp)=>{
        return this.listaProduse.filter(e => e.idprod === idp)[0];
    }
    validcod=(cod)=>{
        return this.listaProduse.filter(e => e.idprod === cod).length == 0;
    }

    save=() => {
        localStorage.setItem("produse", JSON.stringify(this.listaProduse)); //store colors
       
    }

    getStoc = (prodID) => {
        return this.listaProduse.filter(e => e.idprod === prodID)[0].stoc;
        
    }

    updProdus = (prod) => {
        let index = this.listaProduse.indexOf(prod);
        this.listaProduse.splice(index, 1);
        this.listaProduse.push(prod);
    }

    updStoc = (prodId, qntty) => {
        let prod = this.getProdus(prodId);
        prod.stoc += qntty;
        this.updProdus(prod);
    }
 
}
export { ControlProdus };