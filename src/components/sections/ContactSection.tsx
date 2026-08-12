import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '49bd5dbb-c7a7-49bb-90db-3823ee78d88a';

    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      console.error('Please set your VITE_WEB3FORMS_ACCESS_KEY in the .env file');
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Submission failed:', data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // GSAP spinner animation
  useEffect(() => {
    if (isSubmitting && spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      });
    }
  }, [isSubmitting]);

  // GSAP ScrollTrigger entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-form-field', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-info-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info-grid',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-social-btn', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-social-row',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover handlers
  const handleCardEnter = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1.05, boxShadow: '0 0 30px rgba(192, 192, 192, 0.3)', duration: 0.25, ease: 'power2.out' });
  };
  const handleCardLeave = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0 rgba(192, 192, 192, 0)', duration: 0.25, ease: 'power2.out' });
  };

  const handleIconHoverEnter = (el: HTMLDivElement) => {
    gsap.to(el, { rotation: 360, duration: 0.5, ease: 'power2.out' });
  };
  const handleIconHoverLeave = (el: HTMLDivElement) => {
    gsap.to(el, { rotation: 0, duration: 0.5, ease: 'power2.out' });
  };

  const handleBtnEnter = (el: HTMLElement) => {
    gsap.to(el, { scale: 1.05, boxShadow: '0 0 30px rgba(192, 192, 192, 0.3)', color: '#fff', duration: 0.2 });
  };
  const handleBtnLeave = (el: HTMLElement) => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0 rgba(192, 192, 192, 0)', color: '#d1d5db', duration: 0.2 });
  };

  const handleSubmitBtnEnter = (el: HTMLButtonElement) => {
    gsap.to(el, { scale: 1.02, boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)', duration: 0.2 });
  };
  const handleSubmitBtnLeave = (el: HTMLButtonElement) => {
    gsap.to(el, { scale: 1, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', duration: 0.2 });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-24 md:pt-32 pb-16 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          className="contact-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16 text-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          GET IN TOUCH
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-form space-y-4 md:space-y-6 mb-8 md:mb-12"
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="contact-form-field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  aria-label="Your Name"
                  required
                  className="w-full backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-base text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[rgba(192,192,192,0.5)] transition-all"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                />
              </div>

              <div className="contact-form-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  aria-label="Your Email"
                  required
                  className="w-full backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-base text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[rgba(192,192,192,0.5)] transition-all"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                />
              </div>
            </div>

            <div className="contact-form-field">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                aria-label="Subject"
                required
                className="w-full backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-base text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[rgba(192,192,192,0.5)] transition-all"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              />
            </div>

            <div className="contact-form-field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                aria-label="Your Message"
                required
                rows={6}
                className="w-full backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-base text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[rgba(192,192,192,0.5)] transition-all resize-none"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              />
            </div>

            <div className="contact-form-field">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={(e) => handleSubmitBtnEnter(e.currentTarget)}
                onMouseLeave={(e) => handleSubmitBtnLeave(e.currentTarget)}
                className="w-full backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-lg md:rounded-xl px-6 py-3 md:px-8 md:py-4 text-sm md:text-base text-gray-300 font-semibold flex items-center justify-center gap-2 md:gap-3"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      ref={spinnerRef}
                      className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                    />
                    SENDING...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-green-500" />
                    MESSAGE SENT!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-red-500" />
                    FAILED. TRY AGAIN!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Contact Info Cards */}
          <div className="contact-info-grid grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Mail, title: 'EMAIL', value: 'harshrajs1k@gmail.com' },
              { icon: Phone, title: 'PHONE', value: '+91 8799687791' },
              { icon: MapPin, title: 'LOCATION', value: 'Global Remote' },
            ].map((info) => {
              const InfoIcon = info.icon;
              return (
                <div
                  key={info.title}
                  className="contact-info-card backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl p-4 md:p-6 text-center"
                  onMouseEnter={(e) => handleCardEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
                >
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
                    onMouseEnter={(e) => handleIconHoverEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleIconHoverLeave(e.currentTarget)}
                  >
                    <InfoIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                  </div>
                  <div
                    className="text-sm md:text-base font-bold text-gray-300 mb-1 md:mb-2"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {info.title}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">{info.value}</div>
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="contact-social-row flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-8 md:mt-10">
            <a
              href="https://github.com/justHarshraj"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
              onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
              className="contact-social-btn flex-1 sm:flex-none backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-5 py-3 flex items-center justify-center gap-2 md:gap-3 text-gray-300 font-semibold transition-all text-xs md:text-sm cursor-pointer"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              GITHUB
            </a>

            <a
              href="https://www.linkedin.com/in/harsh-raj-533826287"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
              onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
              className="contact-social-btn flex-1 sm:flex-none backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-5 py-3 flex items-center justify-center gap-2 md:gap-3 text-gray-300 font-semibold transition-all text-xs md:text-sm cursor-pointer"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
