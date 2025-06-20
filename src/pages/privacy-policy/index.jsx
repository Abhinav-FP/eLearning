import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Listing from '../api/Listing';
import { Loader } from '@/components/Loader';

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
        <Layout>
            <div className="container pt-[118px] lg:pt-[128px] pb-[50px] lg:pb-[98px]">
                {loading ? (
                    <Loader />
                ) : (
                    <div
                        className="container max-w-3xl mx-auto text-left policy-page"
                        dangerouslySetInnerHTML={{ __html: privacyContent }}
                    />
                )}
            </div>
        </Layout>
    );
}
