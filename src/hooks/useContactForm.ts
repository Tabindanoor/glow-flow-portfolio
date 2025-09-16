
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully! I will get back to you soon.');
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      toast.error('Failed to send message. Please try again.');
    }
  
    setTimeout(() => {
      setFormStatus('idle');
    }, 3000);
  };
// this code is to use sending mail without supabase 


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setFormStatus('submitting');

//   try {
//     const res = await fetch("/api/send-email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) throw new Error("Failed to send message");

//     setFormStatus("success");
//     setFormData({ name: "", email: "", message: "" });
//     toast.success("Message sent successfully! I will get back to you soon.");
//   } catch (error) {
//     console.error("Error sending message:", error);
//     setFormStatus("error");
//     toast.error("Failed to send message. Please try again.");
//   }

//   setTimeout(() => setFormStatus("idle"), 3000);
// };

  return {
    formData,
    formStatus,
    handleChange,
    handleSubmit
  };
};
