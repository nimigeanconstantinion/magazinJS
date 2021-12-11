import { OrderDetails } from "../model/orderDetail.js";


class ControlOrderDetails{

    constructor(orderid) {
        this.orderid = orderid;
        this.listDetails = [];
        this.loadDetails(orderid);
    }

    loadDetails = (oid) => {
        this.listDetails = JSON.parse(localStorage.getItem("details")).filter(e => e.orderid === oid);
    }

    addDetail = (detail) => {
        if (!this.listDetails.filter(e => e.isEqual(detail))) {
            this.listDetails.push(detail);
        } else {
            let oldDetail = this.listDetails[this.isDetail];
            let newDetail = new OrderDetails();
            newDetail.orderid = oldDetail.orderid;
            newDetail.productId = oldDetail.productId;
            newDetail.qnty = oldDetail.qnty + detail.qnty;
            newDetail.price = oldDetail.price;
            newDetail.value = newDetail.qnty * newDetail.price;
            this.updDetail(newDetail);
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
            this.listDetails.splice(index, 1);
            this.listDetails.push(det);

        }
    }
}

export { ControlOrderDetails };