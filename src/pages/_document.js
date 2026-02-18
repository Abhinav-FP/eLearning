import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Standard favicon */}
        <link rel="icon" href="/NewLogo.png" />
        
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