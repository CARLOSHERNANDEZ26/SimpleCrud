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