import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  let res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip Supabase auth if credentials aren't configured yet
  const isConfigured =
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl.startsWith("http");

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (!isConfigured) {
    // Without Supabase, block admin routes but let everything else through
    if (isAdminRoute && !isLoginPage) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      return NextResponse.redirect(redirectUrl);
    }
    return res;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          req.cookies.set(name, value)
        );
        res = NextResponse.next({
          request: { headers: req.headers },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isAdminRoute) {
    if (!session && !isLoginPage) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (session && isLoginPage) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/admin";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
