import { NextResponse } from "next/server";
import { fetchProductById, updateProduct, deleteProduct } from "@/lib/api";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const product = await fetchProductById(id);
        if(!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json(product);
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT (req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();

        if(!body.name || !body.price || !body.categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const product = await updateProduct(id, body);
        return NextResponse.json(product);
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const success = await deleteProduct(id);
        if (!success) return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
        return NextResponse.json({ message: "Product deleted "});
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}