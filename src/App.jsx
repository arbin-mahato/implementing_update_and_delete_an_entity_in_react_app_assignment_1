import React, { useState } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [itemId, setItemId] = useState("");

  const handleIdChange = (e) => {
    setItemId(e.target.value);
  };

  return (
    <div>
      <h1>Update Item</h1>
      <label htmlFor="itemId">Enter Item ID:</label>
      <input
        type="text"
        id="itemId"
        value={itemId}
        onChange={handleIdChange}
        placeholder="Enter item ID"
      />
      {itemId && <UpdateItem itemId={itemId} API_URI={API_URI} />}
    </div>
  );
}

export default App;
