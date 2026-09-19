import "@/shared/styles/globals.css";
import QueryProvider from '@/providers/query-provider'
import ReduxProvider from '@/providers/redux-provider';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexora",
  description: "Nexora",
  icons: {
    icon: "https://res.cloudinary.com/dsnbjtkts/image/upload/v1789643151/d1d3c978-8e27-40b2-b02f-f657756a3ddf_fbjcy8.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ReduxProvider >
            {children}
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
