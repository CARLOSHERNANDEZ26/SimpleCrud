import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";


// This file acts as our Backend API. It handles HTTP requests (GET, POST, PUT, DELETE)
// coming from the client-side.

// READ OPERATION (GET)
// when the frontend requests data, this function retrieves all documents 
// from the 'inventory' collection in Firestore.

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(),
    }));
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}


// CREATE OPERATION (POST)
// this function handles adding new items. It receives data from the body
// of the request and uses 'addDoc' to save it to the cloud.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const docRef = await addDoc(collection(db, "inventory"), {
      name: body.name,
      quantity: body.quantity,
    });
    return NextResponse.json({ id: docRef.id, ...body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add" }, { status: 500 });
  }
}

// UPDATE OPERATION (PUT)
// this function updates an existing item. 
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, quantity } = body;
    const itemRef = doc(db, "inventory", id);
    
    await updateDoc(itemRef, { name, quantity });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// 4. DELETE OPERATION (DELETE)
// this funvction removes an item permanently. It finds the document reference
// by ID and executes the 'deleteDoc' command.
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const itemRef = doc(db, "inventory", body.id);
    
    await deleteDoc(itemRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}