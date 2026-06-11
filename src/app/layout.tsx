import type { Metadata } from "next";
import { Reem_Kufi, Tajawal, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import "./globals.css";

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "تعلّم HTML و CSS — منصة تفاعلية للمبتدئين",
  description:
    "منصة تعليمية عربية لتعلّم تطوير الويب: دورات HTML و CSS مع أمثلة عملية، محرر كود مباشر، واختبارات بعد كل درس.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${reemKufi.variable} ${tajawal.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Apply saved theme before paint to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('edu-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full">
        <ClerkProvider localization={arSA} afterSignOutUrl="/">
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
