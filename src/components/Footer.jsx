export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6 pt-12 pb-8">
        {/* Closing line + back to top */}
        <div className="flex items-end justify-between mb-10">
          <p className="text-[15px] text-[#86868b] leading-[1.6] max-w-[320px]">
            Thanks for scrolling. If something caught your eye,
            let&apos;s chat.
          </p>
          <a
            href="#"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
          >
            Back to top
            <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
              &uarr;
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#d2d2d7] mb-6" />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-[#86868b]">
            &copy; {new Date().getFullYear()} Dylan Swart
          </p>
          <p className="text-[11px] text-[#86868b]">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
