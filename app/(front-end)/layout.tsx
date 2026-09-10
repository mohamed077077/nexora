import "@/shared/styles/globals.css";
import QueryProvider from '@/providers/query-provider'
import ReduxProvider from '@/providers/redux-provider';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexora",
  description: "Nexora",
  icons: {
    icon: "https://res.cloudinary.com/dzgwzplze/image/upload/v1788664545/eb7b7420-9d9a-4ace-84dc-67d7bd4dbe49_jdlel3.png",
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
