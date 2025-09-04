import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { mockCompanyInfo } from '../mock';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(mockCompanyInfo.contact.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          projectType: '',
          budget: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="dark-container" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="display-huge mb-6">Get In Touch</h1>
            <p className="body-large text-gray-400 max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss your ideas and create something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="bg-gray-900/30 backdrop-blur-sm border border-white/10 p-8">
                <h2 className="heading-2 mb-6">Send Us a Message</h2>
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block body-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block body-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block body-medium text-gray-300 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="block body-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white focus:border-brand-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select project type</option>
                        <option value="website">New Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="app">Web Application</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block body-medium text-gray-300 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white focus:border-brand-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block body-medium text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors resize-vertical"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-2 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-brand-primary/10 border border-brand-primary/20">
                      <Mail size={24} style={{ color: 'var(--brand-primary)' }} />
                    </div>
                    <div>
                      <h3 className="heading-3 mb-2">Email</h3>
                      <a
                        href={`mailto:${mockCompanyInfo.contact.email}`}
                        className="body-medium text-gray-400 hover:text-brand-primary transition-colors"
                      >
                        {mockCompanyInfo.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-brand-primary/10 border border-brand-primary/20">
                      <MessageCircle size={24} style={{ color: 'var(--brand-primary)' }} />
                    </div>
                    <div>
                      <h3 className="heading-3 mb-2">WhatsApp</h3>
                      <a
                        href={`https://wa.me/${mockCompanyInfo.contact.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="body-medium text-gray-400 hover:text-brand-primary transition-colors"
                      >
                        {mockCompanyInfo.contact.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-brand-primary/10 border border-brand-primary/20">
                      <MapPin size={24} style={{ color: 'var(--brand-primary)' }} />
                    </div>
                    <div>
                      <h3 className="heading-3 mb-2">Location</h3>
                      <p className="body-medium text-gray-400">
                        United States<br />
                        Remote Services Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gray-900/30 backdrop-blur-sm border border-white/10 p-6">
                <h3 className="heading-3 mb-4">Response Time</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-small text-gray-300">Initial response within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-small text-gray-300">Detailed proposal within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-small text-gray-300">Project timeline within 48 hours</span>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-6">
                <h3 className="heading-3 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="body-small text-gray-400">Monday - Friday</span>
                    <span className="body-small text-gray-300">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="body-small text-gray-400">Saturday</span>
                    <span className="body-small text-gray-300">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="body-small text-gray-400">Sunday</span>
                    <span className="body-small text-gray-300">Closed</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="body-small text-brand-primary">
                      Emergency support available 24/7 for existing clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-brand-primary/50 p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={48} style={{ color: 'var(--brand-primary)' }} />
            </div>
            <h3 className="heading-2 mb-4">Thank You!</h3>
            <p className="body-medium text-gray-400 mb-6">
              We will get back to you within 24 hours.
            </p>
            <button
              onClick={closeSuccessPopup}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};