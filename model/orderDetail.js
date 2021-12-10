

class OrderDetails{

    constructor(orderId, productId, qnty, price, value) {
        this.orderId = orderId;
        this.productId = productId;
        
        this.qnty = qnty;
        this.price = price;
        this.value = value;
    }
    isEqual = (od) => {
        return this.orderId === od.orderId && this.productId === od.productId;
    }
}

export { OrderDetails };