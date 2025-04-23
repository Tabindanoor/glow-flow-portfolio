
import { useRef } from 'react';
import { fadeInUp, staggerFadeIn } from '@/lib/animations';
import { useContactForm } from '@/hooks/useContactForm';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const Contact = () => {
  const { formData, formStatus, handleChange, handleSubmit } = useContactForm();
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formElementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIntersectionObserver({
    target: sectionRef,
    onIntersect: () => {
      if (headingRef.current) fadeInUp(headingRef.current);
      const formElements = formElementRefs.current.filter(Boolean) as HTMLDivElement[];
      if (formElements.length) staggerFadeIn(formElements, 0.15);
    },
    threshold: 0.2,
  });

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
          <ContactInfo ref={formElementRefs.current[0]} />
          <ContactForm
            formRef={formRef}
            elementRef={formElementRefs.current[1]}
            formData={formData}
            formStatus={formStatus}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
