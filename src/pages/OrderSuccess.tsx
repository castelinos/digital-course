import React from "react";

const OrderSuccess: React.FC = () => {

    const params = new URL(window.location.href).searchParams;
    const location = window.location;
    console.log(location.origin);
    

    const customerID = params.get("OG-CustomerID");
    const paymentID = params.get("OG-PaymentID");
    const documentID = params.get("OG-DocumentNumber");

    console.log('items',{
      customerID,
      paymentID,
      documentID
    });
    console.log("URL", new URL(window.location.href));
    
    return (
        <main>Order was successfully placed.</main>
    );
}

export default OrderSuccess