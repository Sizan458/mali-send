import type { Metadata } from "next";
import { Inter ,Space_Grotesk} from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700']
 })

export const metadata: Metadata = {
  title: "QuikSend",
  description: "Pen your emails with precision and speed using QuickQuill, the modern way to send messages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme='light'>
      <body className={`${inter.className} dark:bg-[#4d4d4d]`}>
        <main className="max-w-10xl mx-auto ">
        
          <Navbar/>
        {children}
        <Footer/>
        
        </main>
        </body>
    </html>
  );
}
