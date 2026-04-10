import React from "react";

export default function Features() {
  return (
    <>
      <div className="flex flex-col gap-10 my-20">
        <div>
          <p className="uppercase text-[11px] mb-4 leading-2 text-chart-2 font-medium">
            Features
          </p>
          <h1 className="text-4xl font-dm-serif">Everything you need.</h1>
          <h1 className="text-4xl font-dm-serif italic text-chart-2">
            Nothing you don't.
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
          <div className="bg-card py-9 px-8 ">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[22px]">▦</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold rounded-full bg-muted text-chart-2 px-3 py-1 border border-chart-1">
                Ownership
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2.5">
              Your own school, not a marketplace
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Launch a branded teaching space with your domain. Students know
              they're learning from you — not an anonymous platform.
            </p>
          </div>
          <div className="bg-card py-9 px-8 ">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[22px]">⊕</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold rounded-full bg-muted text-chart-2 px-3 py-1 border border-chart-1">
                Builder
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2.5">
              Course builder without the drag
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Organize lessons, videos, PDFs, and live session links in a clean
              interface. No developer needed, ever.
            </p>
          </div>
          <div className="bg-card py-9 px-8 ">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[22px]">◈</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold rounded-full bg-muted text-chart-2 px-3 py-1 border border-chart-1">
                Monetize
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2.5">
              Payments, handled cleanly
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Accept course fees directly. No marketplace cut, no complex setup.
              Just a payment link and you're live.
            </p>
          </div>
          <div className="bg-card py-9 px-8 ">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[22px]">◉</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold rounded-full bg-muted text-chart-2 px-3 py-1 border border-chart-1">
                Automation
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2.5">
              AI that handles the repeat questions
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              An intelligent assistant reads your course content and answers
              common student queries so you don't have to.
            </p>
          </div>
          <div className="bg-card py-9 px-8 ">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[22px]">⊞</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold rounded-full bg-muted text-chart-2 px-3 py-1 border border-chart-1">
                Communicate
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2.5">
              One inbox for everything
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Announcements, student queries, and updates — centralized. No more
              juggling WhatsApp, Drive, and email.
            </p>
          </div>
          <div className="bg-card py-9 px-8 ">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[22px]">◎</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold rounded-full bg-muted text-chart-2 px-3 py-1 border border-chart-1">
                Accessible
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2.5">
              Works on every screen
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Students access your courses on mobile, tablet, or desktop without
              friction. Teaching that travels with them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
