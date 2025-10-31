import { NextResponse } from "next/server";

let products = [
  { id: 1, title: "Sample Product", price: 100, description: "Test", category: { id: 1, name: "Clothes" }, images: ["https://placehold.co/600x400"] }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request) {
  const data = await request.json();
  const newProduct = { id: Date.now(), ...data };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request) {
  const { id, ...rest } = await request.json();
  products = products.map(p => (p.id == id ? { ...p, ...rest } : p));
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  products = products.filter(p => p.id != id);
  return NextResponse.json({ success: true });
}
