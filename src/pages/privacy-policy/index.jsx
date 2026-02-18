import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Listing from '../api/Listing';
import { Loader } from '@/components/Loader';
import Head from 'next/head';

export default function PrivacyPage() {
    const [privacyContent, setPrivacyContent] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPrivacyPolicy = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.Privacy();
            const content = response?.data?.data?.privcay_policy || '';
            setPrivacyContent(content);
        } catch (error) {
            console.error('Error fetching privacy policy:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrivacyPolicy();
    }, []);

    return (
        <>
        <Head>
          <title>Privacy Policy | Akita Inaka School Online – How We Collect & Protect Your Data</title>
          <meta
            name="description"
            content="Read the Privacy Policy of Akita Inaka School Online to understand how we collect, store, and protect your personal information. Learn about data usage, cookies, user rights, and platform security practices."
          />
        </Head>
        <Layout>
            <div className="pt-[132px] md:pt-[140px] lg:pt-[160px] pb-[20px] md:pb-[40px] lg:pb-[60px]">

                <div className='mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4'>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className=" text-left policy-page"
                            dangerouslySetInnerHTML={{ __html: privacyContent }}
                        />
                    )}
                </div>
            </div>
        </Layout>
        </>
    );
}
