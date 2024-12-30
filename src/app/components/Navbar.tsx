import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Cart from "./Cart";


export default function Navbar() {

    return (
        <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
            <Link href="/" className="uppercase text-bold text-md h-12 flex items-center">
                Next store
            </Link>
            <div className="flex items-center gap-8">
                <Cart />
                <div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="borderrounded-md border-gray-400 px-3 py-2">Login</button>
                        </SignInButton>
                    </SignedOut>

                </div>


            </div>
        </nav>
    )
}