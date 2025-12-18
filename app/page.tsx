"use client";
import { useState, useEffect, FormEvent } from "react";

interface Item {
  id: string; 
  name: string;
  quantity: number;
}

export default function Home() {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  
  // READ (C[R]UD): Fetch all items from the database
 
  const fetchItems = async () => {
    try {
      const res = await fetch("/api/inventory");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInventory(data); // Updates the UI with the list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // CREATE & UPDATE (Handle Form Submit)
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !qty) return;

    const itemData = { name, quantity: Number(qty) };

    if (editId) {
      // UPDATE ([C]R[U]D): Edit an existing item
      await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...itemData, id: editId }),
      });
      setEditId(null);  
    } else {
      // CREATE ([C]RUD): Add a new item
      await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
    }

    await fetchItems();
    setName("");
    setQty("");
  };
  // DELETE (CRU[D]): Remove an item 
  const handleDelete = async (id: string) => {
    await fetch("/api/inventory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchItems(); 
  };

  const handleEdit = (item: Item) => {
    setEditId(item.id);
    setName(item.name);
    setQty(item.quantity.toString());
  };

  return (
    <main className="min-h-screen p-8 bg-[#d0efff] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Inventory System</h1>

      
      <form onSubmit={handleSave} className="bg-white p-6 rounded shadow-md w-full max-w-md mb-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full text-black"
          />
          <input
            type="number"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border p-2 rounded w-24 text-black"
          />
        </div>
        <button
          type="submit"
          className={`w-full text-white p-2 rounded font-bold ${
            editId ? "bg-orange-500 hover: cursor-pointer" : "bg-blue-500 hover: cursor-pointer"
          }`}
        >
          {editId ? "Update Item" : "Add Item "}
        </button>
      </form>

      <div className="w-full max-w-md space-y-3">
        {inventory.length === 0 && <p className="text-center text-gray-500">No items.</p>}

        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-orange-500 px-2 hover: cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 px-2 hover: cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}