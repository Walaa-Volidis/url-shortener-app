import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body>
          <SignedIn>
            <div className="flex">
              <main className="flex-grow">{children}</main>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex justify-center items-center min-h-screen">
              <SignIn routing="hash" />
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
