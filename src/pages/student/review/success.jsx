import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function TipSuccess() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <FaCheckCircle className="w-20 h-20 text-green-600 mb-6" />
            <h2 className="text-3xl font-bold text-green-600 mb-2">
                Thank you for your Tip!
            </h2>
            <p className="text-gray-600 text-center max-w-sm mb-1">
                Your tip has been successfully sent to the teacher.
            </p>

            <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 ">
                Go to Homepage
            </Link>
        </div>
    );
}
