import Image from 'next/image';

const clientLogos = [
  { 
    name: 'Jetex Executive Aviation DWC',
    logo: '/assets/logos/jetex.png',
    alt: 'Jetex Executive Aviation DWC Logo'
  },
  { 
    name: 'Emirates Golf Club',
    logo: '/assets/logos/emirates-golf-club.png',
    alt: 'Emirates Golf Club Logo'
  },
  { 
    name: 'SUSHISAMBA',
    logo: '/assets/logos/sushisamba.png',
    alt: 'SUSHISAMBA Logo'
  },
  { 
    name: 'Al Bateen Executive Airport',
    logo: '/assets/logos/al-bateen.png',
    alt: 'Al Bateen Executive Airport Logo'
  },
  { 
    name: 'Hampton Restaurant',
    logo: '/assets/logos/hampton.png',
    alt: 'Hampton Restaurant Logo'
  },
  { 
    name: 'Leather Doctor',
    logo: '/assets/logos/leather-doctor.png',
    alt: 'Leather Doctor Logo'
  },
];

export default function Clients() {
  return (
    <section id="clients" className="w-full bg-white py-20 md:py-32">
      <div className="page-margin">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#007ec7] md:text-5xl animate-on-scroll animate-fade-in-up">
            Trusted By Dubai&apos;s Leading Businesses
          </h2>
          <p className="mt-6 text-xl text-gray-600 animate-on-scroll animate-fade-in-up animate-delay-200">
            Join our prestigious client roster across hospitality, aviation, and luxury sectors
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {clientLogos.map((client, index) => (
            <div key={client.name} className={`group animate-on-scroll animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 600)}`}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:from-blue-100 hover:to-blue-200 p-6 h-28 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={200}
                  height={200}
                  className="object-contain max-h-16 max-w-full w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                />
                {/* Fallback text for missing logos */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#007ec7]/90 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-white text-center px-3 leading-tight">
                    {client.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}