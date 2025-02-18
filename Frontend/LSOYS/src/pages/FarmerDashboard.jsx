import { useState } from "react";
import React from 'react'
import "../css/Fdash.css"
const FarmerDashboard = () => {
  const [orders,setOrders]= useState([]);
  const [quantity,setQuantity]= useState("");
  const [source,setSource]= useState("");
  const [destination,setDestination]= useState("");
  const [error,setError]= useState("");
  const [success,setSuccess]= useState("");

  const handleOrderSubmit= () =>{
    if(!quantity || !source || !destination){
      setError("All fields are required!");
      return;
    }
    setOrders([...orders, { quantity, source, destination, pickedBy: null, status: "Pending" }]);
    setQuantity("");
    setSource("");
    setDestination("");
    setError("");
    setSuccess("Order placed successfully!");
  
    setTimeout(() => setSuccess(""), 2000);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleOrderSubmit();
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Farmer Dashboard</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Quantity"
            className="border p-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="Source"
            className="border p-2 rounded"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="Destination"
            className="border p-2 rounded"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleOrderSubmit}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Release Order
          </button>
        </div>
      </div>

      <div className="mt-6 w-96">
        <h3 className="text-xl font-bold">Previous Orders</h3>
        <ul className="mt-3">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            orders.map((order, index) => (
              <li key={index} className="border p-3 rounded mb-2 shadow-md">
                <strong>Quantity:</strong> {order.quantity},  
                <strong> Source:</strong> {order.source},  
                <strong> Destination:</strong> {order.destination},  
                <strong> Status:</strong> 
                <span className={`ml-2 ${order.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                  {order.pickedBy ? `Picked by ${order.pickedBy}` : "Pending"}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FarmerDashboard;


