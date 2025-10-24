import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Revoshop</h3>
                        <p className="text-gray-400">Your trusted online store for quality products.</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link href="/admin" className="text-gray-400 hover:text-white">Admin</Link></li>
                            <li><Link href="/cart" className="text-gray-400 hover:text-white">Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <p className="text-gray-400">This is a demo store.</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Revoshop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}