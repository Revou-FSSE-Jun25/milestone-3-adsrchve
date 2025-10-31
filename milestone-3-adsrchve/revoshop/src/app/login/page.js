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
            router.push("/checkout");
        }
        else {
            alert("Login failed. Check your credentials.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Username" 
                       className="border p-2">
                </input>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                       type="password"
                       className="border p-2">
                </input>
                <button>Login</button>
            </form>
        </div>
    );
}