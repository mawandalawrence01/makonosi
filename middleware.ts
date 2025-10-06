import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Toggle the maintenance mode here
const MAINTENANCE_MODE = true;

// Paths to allow so the down page and essential assets can load
const allowPrefixes = [
  '/down',
  '/_next', // Next.js internal assets
  '/favicon.ico',
  '/MAKONOSIBLUEORANGE.png', // logo used on down page
];

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Allow assets and the down page itself
  if (allowPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow static public folder recursive paths (images, videos, etc.)
  // We already covered common ones above; adjust if you need stricter control
  // If you want to block everything except the above, remove this block.

  // Redirect everything else to /down
  const url = request.nextUrl.clone();
  url.pathname = '/down';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/(.*)'],
};


