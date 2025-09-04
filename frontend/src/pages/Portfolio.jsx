import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Filter } from 'lucide-react';
import { mockProjects } from '../mock';

export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Landing Page', 'E-commerce', 'Dashboard', 'Fintech', 'Portfolio', 'Healthcare'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="dark-container" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="display-huge mb-6">Our Portfolio</h1>
            <p className="body-large text-gray-400 max-w-3xl mx-auto">
              Explore our collection of stunning websites and digital experiences that showcase our expertise in modern web development and design.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 border border-white/20 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-black border-brand-primary'
                    : 'bg-transparent text-white hover:border-brand-primary/50 hover:text-brand-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-900/30 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-brand-primary/50 transition-all duration-500 dark-hover"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <button className="p-3 bg-brand-primary text-black hover:bg-brand-active transition-colors">
                        <ExternalLink size={20} />
                      </button>
                      <button className="p-3 bg-white/20 text-white hover:bg-white/30 transition-colors">
                        <Github size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-primary text-black text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="heading-3 mb-3 group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="body-small text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <button className="flex items-center gap-2 text-brand-primary hover:text-brand-active transition-colors group/btn">
                    <span className="body-small font-medium">View Project</span>
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gray-900/20 border border-white/10 p-12 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>50+</div>
                <p className="body-medium text-gray-400">Projects Completed</p>
              </div>
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>100%</div>
                <p className="body-medium text-gray-400">Client Satisfaction</p>
              </div>
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>24/7</div>
                <p className="body-medium text-gray-400">Support Available</p>
              </div>
              <div>
                <div className="display-medium mb-2" style={{ color: 'var(--brand-primary)' }}>3+</div>
                <p className="body-medium text-gray-400">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-12 text-center mb-16">
            <div className="max-w-3xl mx-auto">
              <p className="body-large text-gray-300 mb-6 leading-relaxed italic">
                "Working with CashCue was an incredible experience. They delivered a website that exceeded our expectations and perfectly captured our brand's futuristic vision."
              </p>
              <div>
                <p className="heading-3 mb-1">Alex Thompson</p>
                <p className="body-small text-gray-400">CEO, TechVision Inc.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="display-medium mb-6">Ready to Join Our Portfolio?</h2>
            <p className="body-large text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Your project could be our next featured work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};