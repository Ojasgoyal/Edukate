import React from "react";

export default function Working() {
  return (
    <>
      <div id="learn-more" className="bg-primary py-30 px-7">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end gap-5 mb-16">
            <div>
              <div className="text-[10px] font-semibold uppercase mb-3 text-chart-2 tracking-widest">
                How it works
              </div>
              <h2 className="font-dm-serif text-[42px] text-background leading-tight">
                From zero to <br />
                <em className="text-orange-400 italic"> teaching online </em>
                <br /> in four steps.
              </h2>
            </div>
            <p className="text-chart-1 text-sm max-w-[320px] font-light leading-6">
              Edukate is designed for educators who want to focus on teaching —
              not on managing tools and tech.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-1 ">
            <div className="bg-black group py-10 px-9 hover:border-t hover:border-orange-500">
              <div className="font-dm-serif text-[50px] mb-5 text-chart-5 group-hover:text-orange-400 group-hover:transition-colors group-hover:duration-300">
                01
              </div>
              <div className="text-background font-semibold mb-3">
                Create your school
              </div>
              <div className="text-muted-foreground text-[13px] leading-5">
                Sign up and get a branded teaching space ready in under 5
                minutes. No config, no hosting headaches.
              </div>
            </div>
            <div className="bg-black group py-10 px-9 hover:border-t hover:border-orange-500">
              <div className="font-dm-serif text-[52px] mb-6 text-chart-5 group-hover:text-orange-400 group-hover:transition-colors group-hover:duration-300">
                02
              </div>
              <div className="text-background font-semibold mb-3">
                Create your school
              </div>
              <div className="text-muted-foreground text-[13px] leading-5">
                Sign up and get a branded teaching space ready in under 5
                minutes. No config, no hosting headaches.
              </div>
            </div>
            <div className="bg-black group py-10 px-9 hover:border-t hover:border-orange-500">
              <div className="font-dm-serif text-[52px] mb-6 text-chart-5 group-hover:text-orange-400 group-hover:transition-colors group-hover:duration-300">
                03
              </div>
              <div className="text-background font-semibold mb-3">
                Create your school
              </div>
              <div className="text-muted-foreground text-[13px] leading-5">
                Sign up and get a branded teaching space ready in under 5
                minutes. No config, no hosting headaches.
              </div>
            </div>
            <div className="bg-black group py-10 px-9 hover:border-t hover:border-orange-500">
              <div className="font-dm-serif text-[52px] mb-6 text-chart-5 group-hover:text-orange-400 group-hover:transition-colors group-hover:duration-300">
                04
              </div>
              <div className="text-background font-semibold mb-3">
                Create your school
              </div>
              <div className="text-muted-foreground text-[13px] leading-5">
                Sign up and get a branded teaching space ready in under 5
                minutes. No config, no hosting headaches.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
