import React from 'react';
import { Mail } from 'lucide-react';
import { mockData } from '../data/mock';

const Footer = () => {
  const { footer } = mockData;

  return (
    <footer className="footer-section py-12 bg-[#2C2C2C] text-white">
      <div className="container px-6 md:px-12 max-w-6xl mx-auto">
        <div className="footer-content text-center space-y-6">
          {/* Website Name */}
          <h3 className="font-serif text-2xl md:text-3xl">
            {footer.website}
          </h3>

          {/* Email */}
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            <a 
              href={`mailto:${footer.email}`}
              className="text-lg hover:text-[#D8CFC4] transition-colors duration-300"
            >
              {footer.email}
            </a>
          </div>

          {/* Disclaimer */}
          <div className="pt-8 border-t border-gray-600">
            <p className="text-sm md:text-base text-gray-400 italic max-w-2xl mx-auto">
              {footer.disclaimer}
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Милена Петрова. Всички права запазени.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
