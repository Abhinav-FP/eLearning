import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* PNG favicons for browsers */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        
        {/* Android Chrome icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <style id="antiClickjack">{`body { display: none !important; }`}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      if (self === top) {
        var antiClickjack = document.getElementById("antiClickjack");
        if (antiClickjack) antiClickjack.parentNode.removeChild(antiClickjack);
      } else {
        top.location = self.location;
      }
    `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
