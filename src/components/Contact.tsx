import { useState, useEffect, useRef } from 'react';
import { fadeInUp, staggerFadeIn } from '@/lib/animations';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formElementRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Submission error:', error);
    }
  
    // Reset form status after 3 seconds
    setTimeout(() => {
      setFormStatus('idle');
    }, 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (headingRef.current) fadeInUp(headingRef.current);
          
          const formElements = formElementRefs.current.filter(Boolean) as HTMLDivElement[];
          if (formElements.length) staggerFadeIn(formElements, 0.15);
          
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark/95 to-dark"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={headingRef} className="section-heading text-center">
          Get In <span className="text-neon-cyan">Touch</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div 
            ref={el => { formElementRefs.current[0] = el; }}
            className="space-y-6 opacity-0"
          >
            <h3 className="text-2xl font-space font-bold">
              Send Me A Message
            </h3>
            
            <p className="text-gray-300">
              Have a project idea or just want to say hello? Feel free to reach out!
            </p>

            <div className="flex space-x-4">
              {[ 
                { icon: "🤝", label: "LinkedIn", value: <a href="https://www.linkedin.com/in/tabinda-noor-935429237/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn.com</a> }, 
                { icon: "📧", label: "Email", value: "tabindanoor415@gmail.com" }
              ].map((contact) => (
                <div key={contact.label} className="neon-card p-4 flex-1">
                  <div className="mb-2">{contact.icon}</div>
                  <h4 className="text-sm font-medium text-gray-400">{contact.label}</h4>
                  <p className="text-white">{contact.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={el => { formElementRefs.current[1] = el; }}
            className="opacity-0"
          >
            <form 
              ref={formRef} 
              onSubmit={handleSubmit}
              className="neon-card p-6 rounded-2xl"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-neon-purple/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-transparent shadow-[0_0_5px_rgba(155,93,229,0.2)]"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-neon-purple/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-transparent shadow-[0_0_5px_rgba(155,93,229,0.2)]"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-dark/50 border border-neon-purple/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-transparent shadow-[0_0_5px_rgba(155,93,229,0.2)]"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(155,93,229,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="text-green-400 text-center mt-4">
                    Message sent successfully!
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="text-red-400 text-center mt-4">
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;