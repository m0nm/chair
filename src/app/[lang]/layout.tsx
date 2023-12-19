import "../globals.css";
import type { Metadata } from "next";
import { Inter, Almarai } from "next/font/google";
import { ThemeProvider } from "../_providers/theme-provider";
import { cn } from "../_lib/utils";
import { Sidebar } from "../_components/sidebar";
import { Navbar } from "../_components/navbar";

const inter = Inter({ subsets: ["latin"] });
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Chair | Ecommerce Admin Dashboard",
  description: "Ecommerce Admin Dashboard Template",

  keywords: ["admin dashboard", "Ecommerce", "Next.js", "template", "github"],
  authors: [
    {
      name: "m0nm",
      url: "https://github.com/m0nm",
    },
  ],
  creator: "m0nm",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang ?? "en"} dir={params.lang == "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          params.lang == "ar" ? almarai.className : inter.className,
          "flex h-full bg-muted dark:bg-zinc-900",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <main className="flex-1">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
