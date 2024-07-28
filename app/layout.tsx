import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { ThemeProvider } from './context/ThemeContext';
import ClientThemeWrapper from './context/ClientThemeWrapper';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import { createClient } from '@/utils/supabase/server';
import 'styles/main.css';

const meta = {
  title: 'Next.js Subscription Starter',
  description: 'Brought to you by Vercel, Stripe, and Supabase.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Vercel', 'Supabase', 'Next.js', 'Stripe', 'Subscription'],
    authors: [{ name: 'Vercel', url: 'https://vercel.com/' }],
    creator: 'Vercel',
    publisher: 'Vercel',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vercel',
      creator: '@Vercel',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body className="bg-black">
        <ThemeProvider>
          <ClientThemeWrapper> 
            <Sidebar user = {user} />
            {/* <Navbar /> */}
            <main
              id="skip"
            >
              {children}
            </main>
            <Suspense>
              <Toaster />
            </Suspense>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
