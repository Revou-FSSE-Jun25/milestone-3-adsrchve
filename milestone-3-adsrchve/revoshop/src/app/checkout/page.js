import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";

export default async function CheckoutPage() {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <h1>Checkout Page</h1>
            <p>Welcome, {session?.user?.name || "Guest" }!</p>

            <LogoutButton />
        </div>
    );
}