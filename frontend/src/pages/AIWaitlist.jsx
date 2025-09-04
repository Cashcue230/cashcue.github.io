import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Brain, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { mockCompanyInfo } from '../mock';

export const AIWaitlist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: ''
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
      const response = await fetch(mockCompanyInfo.aiWaitlist.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          form_type: 'AI Waitlist'
        }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setFormData({
          name: '',
          email: '',
          interests: ''
        });
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized passive income recommendations based on your skills and interests."
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time market trends and opportunities in various passive income streams."
    },
    {
      icon: Zap,
      title: "Instant Strategies",
      description: "Receive actionable strategies you can implement immediately to start earning."
    }
  ];

  return (
    <div className="dark-container" style={{ paddingTop: '80px' }}>
      {/* Hero Section with AI Background */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6">
                <span className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium">
                  Coming Soon
                </span>
              </div>
              <h1 className="display-huge mb-6">
                {mockCompanyInfo.aiWaitlist.title}
              </h1>
              <p className="body-large mb-8 text-gray-300">
                {mockCompanyInfo.aiWaitlist.description}
              </p>
              
              {/* Waitlist Form */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 mb-8">
                <h3 className="heading-2 mb-6">Join the Waitlist</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors"
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <textarea
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:border-brand-primary focus:outline-none transition-colors resize-vertical"
                      placeholder="What passive income opportunities interest you most?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>

              {/* Early Access Benefits */}
              <div className="space-y-3">
                <p className="body-medium text-brand-primary font-medium">Early Access Benefits:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-small text-gray-300">50% discount on premium features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-small text-gray-300">Exclusive AI-generated income strategies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-small text-gray-300">Priority customer support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - AI 3D Background */}
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
                    height: "100%",
                    filter: "hue-rotate(60deg)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-32 w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-1 h-1 bg-brand-primary rounded-full animate-ping"></div>
          <div className="absolute top-1/3 left-20 w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">What CashCue AI Will Offer</h2>
            <p className="body-large text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform will revolutionize how you discover and implement passive income strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-black/50 backdrop-blur-sm border border-white/10 p-8 text-center hover:border-brand-primary/50 transition-all duration-500 dark-hover"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-brand-primary/10 border border-brand-primary/20">
                      <IconComponent size={40} style={{ color: 'var(--brand-primary)' }} />
                    </div>
                  </div>
                  <h3 className="heading-2 mb-4">{feature.title}</h3>
                  <p className="body-medium text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Income Streams Preview */}
          <div className="bg-gray-900/30 backdrop-blur-sm border border-white/10 p-12">
            <h3 className="display-medium text-center mb-12">Passive Income Streams We'll Cover</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Digital Products",
                "Affiliate Marketing",
                "Online Courses",
                "Stock Investments",
                "Real Estate",
                "Cryptocurrency",
                "E-commerce",
                "Content Creation"
              ].map((stream, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                    <span className="text-brand-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="body-medium text-gray-300">{stream}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Stats */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="display-medium mb-6">Join 10,000+ Future Entrepreneurs</h2>
          <p className="body-large text-gray-400 mb-12">
            Be the first to access our revolutionary AI platform that will change how you think about passive income.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="display-large mb-2" style={{ color: 'var(--brand-primary)' }}>10k+</div>
              <p className="body-medium text-gray-400">Waitlist Members</p>
            </div>
            <div>
              <div className="display-large mb-2" style={{ color: 'var(--brand-primary)' }}>50+</div>
              <p className="body-medium text-gray-400">Income Strategies</p>
            </div>
            <div>
              <div className="display-large mb-2" style={{ color: 'var(--brand-primary)' }}>Q2</div>
              <p className="body-medium text-gray-400">2024 Launch</p>
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
            <h3 className="heading-2 mb-4">Welcome to the Waitlist!</h3>
            <p className="body-medium text-gray-400 mb-6">
              You'll be the first to know when CashCue AI launches. Get ready to revolutionize your passive income journey!
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