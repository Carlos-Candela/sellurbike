import { useState } from 'react';
import React from 'react';
import UserHeader from '../layout/UserHeader';
import UserMobileSidebar from '../layout/UserMobileSidebar';
import { ChevronDown, ChevronUp } from "lucide-react";

export function Support() {
    const faqs = [
        {
          question: "¿Cómo puedo recuperar mi contraseña?",
          answer: "Puedes restablecer tu contraseña desde la página de inicio de sesión haciendo clic en \"¿Has olvidado tu contraseña?\"."
        },
        {
          question: "¿Cómo contacto con el soporte?",
          answer: "Puedes usar el formulario a la derecha para enviarnos un mensaje directamente."
        },
        {
          question: "¿Dónde puedo ver el estado de mi cuenta?",
          answer: "En tu perfil, encontrarás toda la información relacionada con el estado de tu cuenta."
        }
      ];
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
    <div>
        <UserHeader />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preguntas Frecuentes */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow cursor-pointer" onClick={() => toggleFAQ(index)}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  {openIndex === index && (
                    <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          {/* Formulario de contacto */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contáctanos</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">Nombre</label>
                <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="message">Mensaje</label>
                <textarea id="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-all duration-200">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
      <UserMobileSidebar />
      </div>
    );
  }

export default Support;