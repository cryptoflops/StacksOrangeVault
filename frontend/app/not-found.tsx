
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg-dark text-white flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center space-y-8 glass p-12 rounded-3xl">
                <h1 className="text-9xl font-black text-orange-primary/20 select-none">404</h1>

                <div className="space-y-4">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter">Signal Lost</h2>
                    <p className="text-lg opacity-60">The requested sector of the Orange Vault cannot be located. Coordinates invalid.</p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="btn-primary inline-flex h-14 px-8 items-center justify-center text-lg rounded-xl"
                    >
                        Return to Command Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
