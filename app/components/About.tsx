import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="w-full bg-white py-20 md:py-32">
      <div className="page-margin">
        <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* Image with responsive slant */}
          <div className="relative h-96 w-full md:h-[450px] lg:h-[500px] animate-on-scroll animate-fade-in-left">
            <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl angled-image-left-responsive">
              <Image
                src="https://images.pexels.com/photos/7133130/pexels-photo-7133130.jpeg"
                alt="MWood cleaning team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content on white background with proper contrast */}
          <div className="text-left flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold text-[#007ec7] md:text-4xl lg:text-5xl animate-on-scroll animate-fade-in-right">
              About MWood Cleaning Services
            </h2>
            <p className="mb-6 text-base text-gray-700 leading-relaxed md:text-lg animate-on-scroll animate-fade-in-right animate-delay-200">
              MWood Cleaning Services is a professional team dedicated to
              delivering top‑quality cleaning for both residential and
              commercial spaces across Dubai. We combine trained staff,
              pro‑grade equipment and safe, ISO‑certified chemicals to achieve
              consistently excellent results.
            </p>

            <h3 className="mb-4 text-xl font-bold text-[#007ec7] md:text-2xl animate-on-scroll animate-fade-in-right animate-delay-300">
              Our Mission
            </h3>
            <p className="text-base text-gray-700 leading-relaxed md:text-lg animate-on-scroll animate-fade-in-right animate-delay-400">
              Create clean, healthy environments by delivering exceptional
              service with a focus on quality, reliability and customer
              satisfaction—every visit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}