import React from "react";

export default function Pricing() {
  return (
    <>
      <section className="bg-muted mx-auto py-16 px-6 md:px-10 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="w-full flex flex-col gap-4 items-center py-10 text-center">
            <div className="uppercase font-semibold text-[10px] tracking-widest text-muted-foreground">
              pricing
            </div>
            <h3 className="font-dm-serif text-4xl md:text-5xl">Simple, honest pricing.</h3>
            <p className="font-light text-muted-foreground text-sm md:text-base">
              No hidden fees. No marketplace cuts. You keep what you earn.
            </p>
          </div>
          
          {/* Changed container to flex-col for mobile and lg:flex-row for desktop */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-6 mt-8">
            
            {/* Starter Tier */}
            <div className="border border-border/50 rounded-md bg-background px-8 py-10 w-full max-w-sm xl:w-87.5 flex flex-col">
              <div className="text-muted-foreground text-sm font-semibold mb-2">
                Starter
              </div>
              <div className="font-dm-serif text-5xl mb-3 flex items-baseline gap-2">
                Free <span className="text-sm font-sans font-light text-muted-foreground">/ Forever</span>
              </div>
              <div className="font-light text-sm text-muted-foreground mb-8">
                For educators just getting started.
              </div>

              <ul className="border-t border-border/50 pt-8 text-[13px] text-muted-foreground font-light flex flex-col gap-5 grow">
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> 1 active course
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Up to 50 students
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Basic course builder
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Edukate-branded space
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Community support
                </li>
              </ul>
              <button className="w-full mt-10 bg-[#1a1a1a] text-white hover:bg-black py-3.5 px-8 rounded-sm font-medium text-sm transition-colors">
                Get started free
              </button>
            </div>

            {/* Educator Tier (Highlighted) */}
            <div className="relative border border-[#2a2a2a] rounded-md bg-[#161616] px-8 py-12 w-full max-w-sm xl:w-92.5 flex flex-col lg:-mt-6 lg:-mb-6 shadow-2xl z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f97316] text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-5 rounded-full z-20">
                Most Popular
              </div>
              
              <div className="text-gray-400 text-sm font-semibold mb-2">
                Educator
              </div>
              <div className="font-dm-serif text-5xl text-white mb-3 flex items-baseline gap-2">
                ₹999 <span className="text-sm font-sans font-light text-gray-400">/ per month</span>
              </div>
              <div className="font-light text-sm text-gray-400 mb-8 border-b border-[#2a2a2a] pb-8">
                For serious educators running a real school.
              </div>

              <ul className="text-[13px] text-gray-300 font-light flex flex-col gap-5 grow">
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> Unlimited courses
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> Unlimited students
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> Custom domain
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> Payment integration
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> AI student assistant
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> Priority support
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#f97316] font-bold">✓</span> Analytics dashboard
                </li>
              </ul>
              <button className="w-full mt-10 bg-[#f97316] text-white hover:bg-orange-600 py-3.5 px-8 rounded-sm font-medium text-sm transition-colors">
                Start free trial
              </button>
            </div>

            {/* Institute Tier */}
            <div className="border border-border/50 rounded-md bg-background px-8 py-10 w-full max-w-sm xl:w-87.5 flex flex-col">
              <div className="text-muted-foreground text-sm font-semibold mb-2">
                Institute
              </div>
              <div className="font-dm-serif text-4xl mb-3 flex items-baseline gap-2">
                Custom <span className="text-sm font-sans font-light text-muted-foreground">/ per arrangement</span>
              </div>
              <div className="font-light text-sm text-muted-foreground mb-8">
                For coaching centers and small academies.
              </div>

              <ul className="border-t border-border/50 pt-8 text-[13px] text-muted-foreground font-light flex flex-col gap-5 grow">
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Everything in Educator
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Multiple teacher accounts
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> White-label branding
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Dedicated onboarding
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> SLA support
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span> Custom integrations
                </li>
              </ul>
              <button className="w-full mt-10 bg-[#1a1a1a] text-white hover:bg-black py-3.5 px-8 rounded-sm font-medium text-sm transition-colors">
                Talk to us
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
