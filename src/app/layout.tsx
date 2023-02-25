'use client';
import "./globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Footer from "@/components/generic/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      
      <body className="px-[14rem] font-home">
        <Provider store={store}>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
