import { NextRequest, NextResponse } from 'next/server';

const isValidObjectId = (id: string) =>
  /^[a-f0-9]{24}$/i.test(id);

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 🔴 SONG guard
  if (pathname.match(/^\/song\/[^/]+$/)) {
    const slug = pathname.replace('/song/', '').replace(/\/$/, '');
    const id = slug.split('-').pop();

    if (!id || !isValidObjectId(id)) {
      return new NextResponse(null, { status: 410 });
    }
  }

  // 🔴 ARTIST guard
  if (pathname.match(/^\/artist\/[^/]+$/)) {
    const slug = pathname.replace('/artist/', '').replace(/\/$/, '');
    const id = slug.split('-').pop();

    if (!id || !isValidObjectId(id)) {
      return new NextResponse(null, { status: 410 });
    }
  }

  return NextResponse.next();
}

