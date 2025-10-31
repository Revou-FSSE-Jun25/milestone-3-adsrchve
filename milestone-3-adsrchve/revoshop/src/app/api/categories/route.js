import { NextResponse } from "next/server";

let categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home" },
  { id: 4, name: "Sports" },
];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req) {
  const newCategory = await req.json();
  const id = categories.length + 1;
  const category = { id, ...newCategory };
  categories.push(category);
  return NextResponse.json(category, { status: 201 });
}
