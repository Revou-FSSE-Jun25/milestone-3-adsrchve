"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (!res.error) {
            router.push("/admin");
        } else {
            alert("Login failed. Check your credentials.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1E2A47]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Login to Revoshop
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#0B2347] text-white py-3 rounded-lg font-semibold hover:bg-[#123a74] transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
