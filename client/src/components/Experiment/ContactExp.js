import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center min-h-90" style={{ backgroundColor: "#303134" }}>
      <div className="flex flex-col md:flex-row max-w-8xl w-full p-8 text-white">
        <div className="flex-1 p-6">
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm">Name</label>
                <input type="text" id="name" placeholder="Seu nome" className="w-full mt-1 p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm">E-mail*</label>
                <input type="email" id="email" placeholder="Seu e-mail" className="w-full mt-1 p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="block text-sm">Telephone</label>
                <input type="text" id="phone" placeholder="Seu telefone" className="w-full mt-1 p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm">Message</label>
              <textarea id="message" placeholder="Mensagem" className="w-full mt-1 p-2 bg-transparent border-b border-gray-400 focus:outline-none h-24"></textarea>
            </div>
            <div className="flex items-center mt-6">
              <input type="checkbox" id="robot" className="mr-2" />
              <label htmlFor="robot" className="text-sm">Remember me </label>
            </div>
            <button type="submit" className="mt-4 bg-white text-black px-8 py-2 rounded-sm">SUBMIT</button>
          </form>
        </div>

        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">Nos envie uma mensagem preenchendo o formulário, entraremos em contato o mais rápido possível!</p>
          <p className="mt-4">Se preferir, tire suas dúvidas através do telefone:</p>
          <p className="text-3xl font-bold mt-2">(47) 3084-5500</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
