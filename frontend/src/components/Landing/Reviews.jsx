import React from "react";

export default function Reviews() {
  return (
    <>
      <section className="flex mx-auto px-20 py-25 flex-col">
        <div className="mb-20">
          <div className="text-chart-2 text-xs font-semibold uppercase mb-4">
            Educators love it
          </div>
          <h3 className="text-foreground font-dm-serif text-4xl ">
            Real results from <br />{" "}
            <em className="italic text-chart-2">real teachers.</em>
          </h3>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-6 border border-foreground/20 rounded-sm px-8 py-8">
            <div className="text-orange-400">★ ★ ★ ★ ★</div>
            <div className="text-sm leading-6 text-foreground font-light">
              "I used to manage 3 WhatsApp groups, a shared Drive folder, and a
              payment link. Edukate replaced all of that. I teach, they learn —
              that's it."
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-foreground font-bold mr-3">
                M
              </div>
              <div>
                <div className="font-semibold text-foreground">Meera Nair</div>
                <div className="text-xs text-muted-foreground">
                  UPSC Faculty, Delhi · 180 students
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 border border-foreground/20 rounded-sm px-8 py-8">
            <div className="text-orange-400">★ ★ ★ ★ ★</div>
            <div className="text-sm leading-6 text-foreground font-light">
              "Setting up my physics batch online felt impossible until Edukate.
              Within a weekend, I had a proper school running and my first paid
              enrollment."
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-foreground font-bold mr-3">
                R
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  Rohit Sharma
                </div>
                <div className="text-xs text-muted-foreground">
                  JEE Physics, Kota · 340 students
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 border border-foreground/20 rounded-sm px-8 py-8">
            <div className="text-orange-400">★ ★ ★ ★ ★</div>
            <div className="text-sm leading-6 text-foreground font-light">
              "The AI assistant alone saves me two hours every day. Students ask
              the same questions — now the platform answers for me."
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-foreground font-bold mr-3">
                D
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  Divya Krishnan
                </div>
                <div className="text-xs text-muted-foreground">
                  NEET Chemistry, Chennai · 210 students
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-px bg-foreground/20 mt-16">
            <div className="bg-muted flex flex-col justify-center items-center gap-4 px-10 py-12">
                <h3 className="text-4xl font-dm-serif">200+</h3>
                <div className="text-muted-foreground text-xs ">Educators</div>
            </div>
            <div className="bg-muted flex flex-col justify-center items-center gap-4 px-10 py-8">
                <h3 className="text-4xl font-dm-serif">12000+</h3>
                <div className="text-muted-foreground text-xs ">Students Taught</div>
            </div>
            <div className="bg-muted flex flex-col justify-center items-center gap-4 px-10 py-8">
                <h3 className="text-4xl font-dm-serif">2Cr+</h3>
                <div className="text-muted-foreground text-xs ">Payments processed</div>
            </div>
            <div className="bg-muted flex flex-col justify-center items-center gap-4 px-10 py-8">
                <h3 className="text-4xl font-dm-serif">4.9/5</h3>
                <div className="text-muted-foreground text-xs ">Avg. educator rating</div>
            </div>

        </div>
      </section>
    </>
  );
}
