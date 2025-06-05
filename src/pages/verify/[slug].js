import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Listing from '../api/Listing';
import toast from 'react-hot-toast';

const Button = () => {
  return (
    <button
      className="inline-flex items-center justify-center text-lg px-8 py-4 rounded-full border-2 border-rose-500 text-rose-500 hover:border-rose-600 hover:bg-rose-400 hover:bg-opacity-10 hover:text-white focus:border-rose-700 focus:text-rose-700 active:border-rose-800 active:text-rose-800 transition duration-150 ease-in-out focus:outline-none focus:ring-0 cursor-not-allowed"
      type="button"
    >
      <div
        role="status"
        className="inline-block h-4 w-4 mr-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      >
        <span className="sr-only">Verifying...</span>
      </div>
      Verifying
    </button>
  );
};

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading,setLoading]=useState(false);

  const Verify = async (slug) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.emailVerify({token : slug});
      if(response?.data?.status){
        toast.success("Email Verified Successfully");
        router.push("/");
      }
    } catch (err) {
      console.log("Error fetching shipments:", err);
      toast.error("Error verifying token.")
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      Verify(slug);
    }
  }, [slug]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
        {loading ? 
      <Button />
      :
      <p className='text-white'>
        Error Verifying token. Invalid or expired url. Please generate a new link.
      </p>
    }
    </div>
  );
}
