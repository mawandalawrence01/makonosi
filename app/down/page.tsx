'use client';

import Image from 'next/image';

export default function DownPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <Image src="/MAKONOSIBLUEORANGE.png" alt="Makonosi Logo" width={48} height={48} className="w-12 h-12 object-contain" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">Service Temporarily Unavailable</h1>
        <p className="text-blue-100 mb-6">This website is currently unavailable due to non-payment. Please contact the owner to restore service.</p>
        <div className="space-y-2 text-sm text-blue-200/80">
          <p>For inquiries, reach the website owner or billing contact.</p>
          <p className="mt-4">If you are the owner, settle the outstanding balance to restore access.</p>
        </div>
      </div>
    </div>
  );
}


