// pages/documentation.jsx
import Head from "next/head";
import Layout from "./common/Layout";

export default function ZoomDocumentation() {
  return (
    <Layout>
      <Head>
        <title>Zoom App Integration Guide | Japanese For Me Platform</title>
        <meta
          name="description"
          content="Guide to connect, use, and remove your Zoom account with our Japanese For Me platform."
        />
      </Head>
      <div className="pt-[132px] md:pt-[140px] lg:pt-[160px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
      <main className="max-w-3xl mx-auto px-4 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Zoom App Integration Guide</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">1. Connecting Your Zoom Account</h2>
          <p className="mb-4">
            To start using Zoom for hosting your video lessons, you need to connect your Zoom account to our platform.
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Login to your teacher account on our eLearning platform.</li>
            <li>Go to the <strong>Settings</strong> section in your dashboard.</li>
            <li>Click on <strong>“Connect Zoom Account”</strong>.</li>
            <li>You will be redirected to Zoom's OAuth consent screen.</li>
            <li>Authorize the app to access your Zoom account.</li>
            <li>You’ll be redirected back once connected successfully.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">2. Using Zoom with Your Classes</h2>
          <p className="mb-4">
            Once connected, we will automatically create Zoom meetings for your scheduled classes using your Zoom account.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Meeting links are generated automatically when a student books your lesson.</li>
            <li>Zoom links are available on the student and teacher dashboards.</li>
            <li>We also send meeting reminders before the session starts.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">3. Disconnecting Your Zoom Account</h2>
          <p className="mb-4">
            You can revoke Zoom access anytime by disconnecting it from your profile.
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to <strong>Settings</strong> in your dashboard.</li>
            <li>Click on <strong>“Disconnect Zoom Account”</strong>.</li>
            <li>This will also delete any future scheduled Zoom meetings.</li>
            <li>Note: You can reconnect your Zoom account at any time.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Support</h2>
          <p>
            If you face any issues while connecting or using Zoom, feel free to contact us at{" "}
            <a href="mailto:office@japaneseforme.com" className="text-blue-600 underline">
              office@japaneseforme.com
            </a>.
          </p>
        </section>
      </main>
      </div>
    </Layout>
  );
}