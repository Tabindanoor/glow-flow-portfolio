
import { useState } from 'react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
  
    try {
      // Use the correct API path (without the base URL)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        toast.success('Message sent successfully! I will get back to you soon.');
      } else {
        setFormStatus('error');
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setFormStatus('error');
      toast.error('Something went wrong. Please try again later.');
      console.error('Submission error:', error);
    }
  
    setTimeout(() => {
      setFormStatus('idle');
    }, 3000);
  };

  return {
    formData,
    formStatus,
    handleChange,
    handleSubmit
  };
};
