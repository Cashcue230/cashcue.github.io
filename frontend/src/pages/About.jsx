import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Target, Zap, Code, Palette, Rocket } from 'lucide-react';
import { mockCompanyInfo } from '../mock';

export const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      expertise: "Full-Stack Development, UI/UX Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Henry Wilson",
      role: "Creative Director",
      expertise: "3D Animation, Visual Design",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3w5MTMyfDB8MHx8d29tYW4gY29tcHV0ZXJ8fDB8fHx8MTcxMDY5MzYyNw&w=400&h=400&fit=crop&crop=faces"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      expertise: "Backend Systems, AI Integration",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We're always pushing the boundaries of what's possible in web development."
    },
    {
      icon: Zap,
      title: "Performance Driven",
      description: "Every website we build is optimized for speed, accessibility, and user experience."
    },
    {
      icon: Users,
      title: "Client Focused",
      description: "Your success is our success. We work closely with you to achieve your goals."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "We maintain the highest standards in code quality and project delivery."
    }
  ];

  const skills = [
    { name: "Frontend Development", percentage: 95, icon: Code },
    { name: "UI/UX Design", percentage: 90, icon: Palette },
    { name: "3D Animations", percentage: 85, icon: Rocket },
    { name: "Performance Optimization", percentage: 92, icon: Zap }
  ];

  return (
    <div className="dark-container" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="display-huge mb-6">About CashCue</h1>
            <div className="max-w-4xl mx-auto">
              <p className="body-large text-gray-400 mb-8">
                {mockCompanyInfo.about}
              </p>
              <p className="body-medium text-gray-300">
                We combine cutting-edge technology with creative design to deliver websites that don't just look amazing — they perform exceptionally and drive real business results.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gray-900/30 backdrop-blur-sm border border-white/10 p-12 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="display-medium mb-6">Our Mission</h2>
              <p className="body-large text-gray-300 leading-relaxed">
                To revolutionize the digital landscape by creating futuristic web experiences that captivate audiences, drive engagement, and deliver measurable results for businesses of all sizes.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <h2 className="display-medium text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="group bg-black/50 backdrop-blur-sm border border-white/10 p-6 text-center hover:border-brand-primary/50 transition-all duration-500 dark-hover"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-brand-primary/10 border border-brand-primary/20">
                        <IconComponent size={32} style={{ color: 'var(--brand-primary)' }} />
                      </div>
                    </div>
                    <h3 className="heading-3 mb-3">{value.title}</h3>
                    <p className="body-small text-gray-400">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <h2 className="display-medium text-center mb-12">Our Expertise</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 p-2 bg-brand-primary/10 border border-brand-primary/20">
                        <IconComponent size={24} style={{ color: 'var(--brand-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="heading-3">{skill.name}</span>
                          <span className="body-small" style={{ color: 'var(--brand-primary)' }}>
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 h-2">
                          <div
                            className="h-2 transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.percentage}%`,
                              background: 'var(--brand-primary)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="display-medium text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group bg-gray-900/30 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-brand-primary/50 transition-all duration-500 dark-hover"
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="heading-3 mb-2">{member.name}</h3>
                    <p className="body-medium mb-3" style={{ color: 'var(--brand-primary)' }}>
                      {member.role}
                    </p>
                    <p className="body-small text-gray-400">{member.expertise}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-900/20 border border-white/10 p-12 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>3+</div>
                <p className="body-medium text-gray-400">Years in Business</p>
              </div>
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>50+</div>
                <p className="body-medium text-gray-400">Happy Clients</p>
              </div>
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>100+</div>
                <p className="body-medium text-gray-400">Projects Delivered</p>
              </div>
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>24/7</div>
                <p className="body-medium text-gray-400">Support Available</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="display-medium mb-6">Ready to Work Together?</h2>
            <p className="body-large text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Get In Touch
                <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="btn-secondary">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};