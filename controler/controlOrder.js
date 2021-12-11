import Persoana from "../model/persoana.js";
import { ControlPersoana } from "./controlPersoana.js";
import { Produs } from "../model/produs.js";
import { Order } from "../model/order.js";

import { OrderDetails } from "../model/orderDetail.js";
import { ControlProdus } from "./controlProdus.js";
import { ControlOrderDetails } from "./controlOrderDetail.js";

class ControlOrder{

    constructor(idPers) {
        this.idClient = idPers;
        this.controlPersoana = new ControlPersoana();

        this.client = this.controlPersoana.listaPersoane[this.controlPersoana.isPersoana(this.idClient)];

        this.controlProdus = new ControlProdus();
        this.listaProduse = this.controlProdus.listaProduse;
        this.cos = [];
        this.listOrders = [];
        this.listOrdersDetails = [];
        this.loadOrders();


    }

    loadOrders = () => {
        this.listOrders = JSON.parse(localStorage.getItem("orders"));
    }

    addOrder = (order) => {
//        let date = new Date(order.orderDate);
        let indx = this.isOrderActive(order.userId);
        if (indx == -1) {
            let go = true;
            let oid = "";
            while (go) {
                oid = order.genId();
                go = this.isOrder(oid) != -1;
           }
            order.orderId = oid;
            this.listOrders.push(order);
            this.save();
        } else {
            order.orderId = this.listOrders[indx].orderId;
            this.updOrder(order);
        }
    }

    isOrder = (idord) => {
        if (this.listOrders.filter(e => e.orderId === idord).length > 0) {
            return this.listOrders.indexOf(this.listOrders.filter(e => e.orderId === idord)[0]);
        }
        return -1;

    }

    isOrderActive = (idpers) => {
        let listtmp = [];
        listtmp = this.listOrders.filter(e =>e.userId===idpers&&e.status==0);
        if (listtmp.length>0) {
            return this.listOrders.indexOf(listtmp[0]);
        }
        return -1;

    }

    save = () => {
        localStorage.setItem("orders", JSON.stringify(this.listOrders));
    }

    updOrder = (ord) => {
        let indx = this.isOrder(ord.orderId);
        if (indx != -1) {
            this.listOrders.splice(indx, 1);
            this.listOrders.push(ord);
            this.save();
        }
    }

    finishOrder = (ord) => {
        let controlOD = new ControlOrderDetails(ord.orderId);
        let listDet = controlOD.listDetails;

        let isok = listDet.filter(e => {
            return e.qnty > this.controlProdus.getStoc(e.productId);
        }).length;
        if (isok = 0) {
            listDet.forEach(e => {
                this.controlProdus.updStoc(e.productId, -e.qnty);
            })
            ord.status = 1;
            this.updOrder(ord);
        }        

    }    

}
export { ControlOrder };