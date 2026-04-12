import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="font-serif text-xl md:text-2xl text-[#2C2C2C] hover:text-[#8C7A6B] transition-colors duration-300">
          milenapetrova.bg
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/book')}
            variant="outline"
            className="border-[#8C7A6B] text-[#8C7A6B] hover:bg-[#8C7A6B] hover:text-white transition-all duration-300"
          >
            Директно записване
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
