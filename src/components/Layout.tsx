import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AdUnit from './AdUnit';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <AdUnit 
        slot="1122334455" 
        format="fluid"
        className="w-full bg-gray-50 border-b" 
        style={{ minHeight: '90px' }} 
      />
      <main className="flex-grow">{children}</main>
      <AdUnit 
        slot="5544332211" 
        className="w-full bg-gray-50 border-t" 
        style={{ minHeight: '250px' }} 
      />
      <Footer />
    </div>
  );
}