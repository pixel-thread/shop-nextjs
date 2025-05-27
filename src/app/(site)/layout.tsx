"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import PreLoader from "@/components/Common/PreLoader";
import { MainProvider } from "@/provider";
import { Ternary } from "@/components/Common/Ternary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Ternary
          condition={loading}
          ifTrue={<PreLoader />}
          ifFalse={<MainProvider>{children}</MainProvider>}
        />
      </body>
    </html>
  );
}
