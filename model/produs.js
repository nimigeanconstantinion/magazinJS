class Produs{

    constructor(idprod,denumire,marca,tip,categorie,info,stoc,pret) {
        this.idprod = idprod;
        this.denumire = denumire;
        this.marca = marca;
        this.tip = tip;
        this.categorie = categorie;
        this.info = info;
        this.stoc = stoc;
        this.pret = pret;
    }

    isEqual = (p) => {
        if (this.denumire.toLowerCase()==p.denumire.toLowerCase()&&this.marca.toLowerCase()==p.marca.toLowerCase()&&this.tip.toLowerCase()==p.tip.toLowerCase()) {
            return true;
        }
        return false;
    }

    genId = () => {
        let strAlfa = "ABCDEFGHIJKLMNOPQRSTUWXYZ"
        let id = "";
        for (let i = 0; i < 3; i++){
            let index = Math.round(Math.random() *24) ;
            
            id += strAlfa.substr(index, 1);
        }
        for (let i = 0; i < 3; i++){
            let index = Math.round(Math.random() * 9);
            id += index;
        }
        return id;
    }
}

export { Produs};