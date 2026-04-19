import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Velocitytype',
  description: 'Teste sua velocidade de digitação, melhore seu wpm e divirta-se.',
  generator: 'Velocitytype',
  keywords: ['typing test', 'wpm', 'typing speed', 'keyboard', 'practice'],
  authors: [{ name: 'Velocitytype' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

import { Toaster } from '@/components/ui/sonner'
import { LocaleProvider } from '@/components/locale-provider'
import { Footer } from '@/components/typing/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <LocaleProvider>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <Toaster position="bottom-right" richColors />
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  )
}
