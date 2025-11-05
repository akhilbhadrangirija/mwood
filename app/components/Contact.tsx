// Simple form component - no state logic yet
function QuoteForm() {
  return (
    <form action="#" method="POST" className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-3">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            placeholder="Enter your full name"
            className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#007ec7] focus:ring-4 focus:ring-[#007ec7]/10 focus:bg-white transition-all duration-200 placeholder-gray-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-3">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            required
            placeholder="+971 XX XXX XXXX"
            className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#007ec7] focus:ring-4 focus:ring-[#007ec7]/10 focus:bg-white transition-all duration-200 placeholder-gray-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="your.email@example.com"
          className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#007ec7] focus:ring-4 focus:ring-[#007ec7]/10 focus:bg-white transition-all duration-200 placeholder-gray-500"
        />
      </div>
      
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-gray-800 mb-3">
          Service Needed *
        </label>
        <select
          id="service"
          name="service"
          required
          className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#007ec7] focus:ring-4 focus:ring-[#007ec7]/10 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
        >
          <option value="">Select a service...</option>
          <option value="sofa">Sofa Cleaning</option>
          <option value="carpet">Carpet Cleaning</option>
          <option value="curtain">Curtain Cleaning</option>
          <option value="deep">Deep Cleaning</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-3">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your cleaning requirements, property size, or any specific needs..."
          className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#007ec7] focus:ring-4 focus:ring-[#007ec7]/10 focus:bg-white transition-all duration-200 placeholder-gray-500 resize-none"
        />
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#007ec7] to-[#009fe3] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-[#006bb3] hover:to-[#008bd6] transform hover:scale-[1.02] transition-all duration-200 focus:ring-4 focus:ring-[#007ec7]/30"
        >
          Get Your Free Quote
        </button>
        <p className="text-sm text-gray-600 text-center mt-3">
          We&apos;ll respond within 24 hours with a customized quote
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full bg-[#41c0f0] py-20 md:py-32"
    >
      <div className="page-margin">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Get a Free, No-Obligation Quote
          </h2>
          <p className="mt-6 text-xl text-white">
            Contact us today and let us bring new life to your space.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl bg-white p-12 shadow-2xl border border-white/20 backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Your Quote</h3>
              <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you quickly</p>
            </div>
            <QuoteForm />
          </div>

          {/* Contact Info */}
          <div className="text-left">
            <h3 className="mb-8 text-3xl font-bold text-white">
              Or Contact Us Directly
            </h3>
            <p className="mb-10 text-xl text-white">
              Feel free to call or email us for immediate assistance.
            </p>
            <div className="space-y-8">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white">Anil Bepu</h4>
                <p className="text-white/80">General Manager</p>
                <a
                  href="tel:+971503545972"
                  className="text-xl font-semibold text-white hover:text-[#41c0f0] transition-colors"
                >
                  +971 50-3545972
                </a>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white">Mani</h4>
                <p className="text-white/80">Operation Manager</p>
                <a
                  href="tel:+971552601223"
                  className="text-xl font-semibold text-white hover:text-[#41c0f0] transition-colors"
                >
                  +971 55-2601223
                </a>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white">Email</h4>
                <a
                  href="mailto:info@mwooduae.com"
                  className="text-xl font-semibold text-white hover:text-[#41c0f0] transition-colors"
                >
                  info@mwooduae.com
                </a>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white">Address</h4>
                <p className="text-lg text-white/90">
                  MWOOD CLEANING SERVICES
                  <br />
                  DUBAI - UAE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}