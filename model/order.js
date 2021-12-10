

class Order{
    constructor(userId, orderId,orderDate,price,status) {
        this.userId = userId;
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.status = status;
        this.price = price;

    }
    
    genId = () => {
        let strAlfa = "ABCDEFGHIJKLMNOPQRSTUWXYZ"
        let id = "";
        for (let i = 0; i < 3; i++){
            let index = Math.round(Math.random() *24) ;
            
            id += strAlfa.substr(index, 1);
        }
        for (let i = 0; i < 6; i++){
            let index = Math.round(Math.random() * 9);
            id += index;
        }
        return id;
    
    }
}


export { Order };