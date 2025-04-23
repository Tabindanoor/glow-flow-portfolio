
import React from 'react';
import { FormStatus } from '@/hooks/useContactForm';

interface ContactFormProps {
  formRef?: React.RefObject<HTMLDivElement>;
  formData: {
    name: string;
    email: string;
    message: string;
  };
  formStatus: FormStatus;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formRef,
  formData,
  formStatus,
  handleChange,
  handleSubmit
}) => {
  return (
    <div 
      ref={formRef}
      className="opacity-0"
    >
      <form 
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
  );
};

export default ContactForm;
