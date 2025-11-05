import Image from 'next/image';

interface Service {
  title: string;
  description: string;
  imageUrl: string;
}

const serviceData: Service[] = [
  {
    title: 'Premium Sofa Cleaning',
    description: "Transform your furniture with our advanced deep cleaning techniques. We eliminate stubborn stains, odors, and allergens using ISO-certified, non-toxic solutions that leave your sofa looking and feeling like new.",
    imageUrl: 'https://images.pexels.com/photos/7534547/pexels-photo-7534547.jpeg',
  },
  {
    title: 'Professional Carpet Cleaning',
    description: "Revitalize your carpets with our state-of-the-art cleaning technology. Our certified technicians use eco-friendly products and advanced extraction methods to remove deep-seated dirt, stains, and allergens.",
    imageUrl: 'https://images.pexels.com/photos/4107286/pexels-photo-4107286.jpeg',
  },
  {
    title: 'Expert Curtain Care',
    description: "Restore the beauty of your curtains with our specialized cleaning process. We preserve fabric integrity and colors while eliminating dust, allergens, and odors using premium ISO-certified treatments.",
    imageUrl: 'https://images.pexels.com/photos/17573843/pexels-photo-17573843.jpeg',
  },
  {
    title: 'Comprehensive Deep Cleaning',
    description: "Experience our thorough sanitization service that covers every detail. From disinfecting bathrooms and kitchens to appliance cleaning and stain removal, we deliver a complete transformation of your space.",
    imageUrl: 'https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full bg-[#007ec7] py-20 md:py-32">
      <div className="page-margin">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl animate-on-scroll animate-fade-in-up">
            Expert Cleaning Solutions
          </h2>
          <p className="mt-6 text-xl text-white animate-on-scroll animate-fade-in-up animate-delay-200">
            Advanced techniques and professional expertise for exceptional results across residential and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {serviceData.map((service, index) => (
            <div
              key={service.title}
              className={`group overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 animate-on-scroll animate-slide-in-scale animate-delay-${(index + 1) * 100}`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-[#007ec7]">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}