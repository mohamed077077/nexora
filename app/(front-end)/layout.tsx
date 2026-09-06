import "@/shared/styles/globals.css";
import QueryProvider from '@/providers/query-provider'
import ReduxProvider from '@/providers/redux-provider';



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
