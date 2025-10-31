import React from "react";

function CartItem({ item, onRemove }) {
    console.log("Render:", item.name);
    return (
        <div className="flex justify-between mb-2">
            <div>{item.name} x {item.quantity}</div>
            <div>${item.price * item.quantity}{" "}
                <button onClick={() => onRemove(item.id)} className="text-red-500 ml-2">Remove</button>
            </div>
        </div>
    );
}

export default React.memo(CartItem);