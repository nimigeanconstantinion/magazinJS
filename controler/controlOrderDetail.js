

class ControlOrderDetails{

    constructor(orderid) {
        this.orderid = orderid;
        this.listDetails = [];
    }

    loadDetails = (oid) => {
        this.listDetails = JSON.parse(localStorage.getItem("details")).filter(e => e.orderid === oid);
    }

    addDetail = (detail) => {
        if (!this.listDetails.filter(e => e.isEqual(detail))) {
            this.listDetails.push(detail);
        } else {
            
        }
    
    }

    isDetail = (detail) => {
        let odL = this.listDetails.filter(e => detail.isEqual(e))[0];
        if (odL) {
            return this.listDetails.indexOf(odL);
        }
        return -1;
    }
    

    updDetail = (det)=>{
        let index = this.isDetail(det);
        if (!index == -1) {
            let oldDet = this.listDetails[index];
            oldDet.qnty += det.qnty;
        }
    }
}

export { ControlOrderDetails };