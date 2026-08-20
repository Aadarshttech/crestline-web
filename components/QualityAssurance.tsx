"use client";

const standards = [
  {
    title: "Precision Engineering",
    desc: "Every cooker chassis and furniture frame is fabricated using high-precision CNC tooling and robotic ultrasonic welding with strict ±0.05mm tolerances.",
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    )
  },
  {
    title: "Certified Materials",
    desc: "We exclusively utilize certified Schott Ceran thermal glass, aircraft-grade 6061 aluminum, and full-grain leathers verified under global export compliance.",
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: "Rigorous QA Standards",
    desc: "Each production batch undergoes 100% electrical safety audits, thermal cycle stress tests, and dynamic weight load tests before container dispatch.",
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function QualityAssurance() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 bg-[#FAFAF8] border-t border-neutral-200/80 text-neutral-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200/80 text-[11px] font-semibold tracking-wider text-neutral-700 uppercase mb-3">
            Factory Standards
          </div>
          <h3 className="text-3xl md:text-4xl font-outfit font-light tracking-tight text-neutral-950 uppercase">
            The Crestline <span className="font-semibold text-neutral-900">Manufacturing Standard</span>
          </h3>
        </div>

        {/* 3-Column Standard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center mb-6">
                  {std.icon}
                </div>
                <h4 className="text-lg font-outfit font-semibold uppercase tracking-wider text-neutral-950 mb-3">
                  {std.title}
                </h4>
                <p className="text-neutral-600 font-outfit font-light text-sm leading-relaxed">
                  {std.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
