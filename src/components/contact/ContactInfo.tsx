
interface ContactInfoProps {
  ref: React.RefObject<HTMLDivElement>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ ref }) => {
  return (
    <div 
      ref={ref}
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
  );
};

export default ContactInfo;
