import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Zap, Rocket, Star } from 'lucide-react';
import { mockCompanyInfo, mockServices, mockTestimonials } from '../mock';

export const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Cursor following effect for the robot
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // This will be enhanced with actual Spline interaction
      console.log('Cursor position:', { x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dark-container">
      {/* Hero Section with 3D Robot */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden" style={{ paddingTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="display-huge mb-6">
                {mockCompanyInfo.tagline}
              </h1>
              <p className="body-large mb-8 text-gray-300">
                {mockCompanyInfo.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToContact}
                  className="btn-primary group"
                >
                  Start Your Project
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <Link to="/portfolio" className="btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>

            {/* Right - 3D Robot */}
            <div className="relative h-[700px] w-full">
              <div 
                style={{ 
                  width: "700px", 
                  height: "700px", 
                  overflow: "visible", 
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              >
                <Spline 
                  scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-1 h-1 bg-brand-primary rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">What We Create</h2>
            <p className="body-large text-gray-400 max-w-3xl mx-auto">
              We specialize in building cutting-edge digital experiences that push the boundaries of what's possible on the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockServices.map((service, index) => (
              <div
                key={service.id}
                className="group bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-brand-primary/50 transition-all duration-500 dark-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  {index === 0 && <Zap size={32} style={{ color: 'var(--brand-primary)' }} />}
                  {index === 1 && <Rocket size={32} style={{ color: 'var(--brand-primary)' }} />}
                  {index === 2 && <Star size={32} style={{ color: 'var(--brand-primary)' }} />}
                  {index === 3 && <ArrowRight size={32} style={{ color: 'var(--brand-primary)' }} />}
                </div>
                <h3 className="heading-3 mb-3">{service.title}</h3>
                <p className="body-small text-gray-400 mb-4">{service.description}</p>
                <div className="space-y-1">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-primary rounded-full"></div>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              Explore All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">What Our Clients Say</h2>
            <p className="body-large text-gray-400">
              Don't just take our word for it — see what our clients think about working with CashCue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-black/50 backdrop-blur-sm border border-white/10 p-8 hover:border-brand-primary/30 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" style={{ color: 'var(--brand-primary)' }} />
                  ))}
                </div>
                <p className="body-medium text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="heading-3 mb-1">{testimonial.name}</p>
                  <p className="body-small text-gray-400">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-section" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="display-medium mb-6">Ready to Build Something Amazing?</h2>
          <p className="body-large text-gray-400 mb-8">
            Let's create a futuristic website that sets your business apart from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get Started Today
              <ArrowRight size={20} />
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};