import React, { useState, useEffect } from "react";

const UpdateItem = ({ itemId, API_URI }) => {
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/${itemId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const data = await response.json();
        setItem(data);
        setFormData(data); // Initialize form data with the fetched item
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [itemId, API_URI]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const updatedItem = await response.json();
      setItem(updatedItem);
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Item</h2>
      {Object.keys(formData).map((key) => {
        const value = formData[key];
        // Render only primitive values in input fields
        if (typeof value === "string" || typeof value === "number") {
          return (
            <div key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
              />
            </div>
          );
        }
        return (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <p>{JSON.stringify(value)}</p>{" "}
            {/* Display non-primitive values as JSON */}
          </div>
        );
      })}
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateItem;
