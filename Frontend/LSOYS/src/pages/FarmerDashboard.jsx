import { useState } from "react";
 const FarmerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
  
    const handleOrderSubmit = () => {
      setOrders([...orders, { quantity, source, destination, pickedBy: null }]);
      setQuantity("");
      setSource("");
      setDestination("");
    };
  
    return (
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
        <div className="mt-5">
          <input type="text" placeholder="Quantity" className="border p-2 m-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <input type="text" placeholder="Source" className="border p-2 m-2" value={source} onChange={(e) => setSource(e.target.value)} />
          <input type="text" placeholder="Destination" className="border p-2 m-2" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <button onClick={handleOrderSubmit} className="bg-blue-500 text-white p-2">Release Order</button>
        </div>
        <h3 className="text-xl font-bold mt-5">Previous Orders</h3>
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="border p-2 m-2">
              Quantity: {order.quantity}, Source: {order.source}, Destination: {order.destination}, Picked By: {order.pickedBy || "Not picked yet"}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default FarmerDashboard;