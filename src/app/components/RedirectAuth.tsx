'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectAuth() {
  const pathname = usePathname();
  const router = useRouter();

  // testing redirect – replace backend
  const isAuthenticated = false;

  useEffect(() => {
    const isPublic = pathname === '/' || pathname === '/login' || pathname === '/signup';
    if (!isPublic && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname]);

  return null;
}
