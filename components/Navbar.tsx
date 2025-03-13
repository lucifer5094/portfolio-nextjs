'use client';
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-30 flex justify-between items-center p-4 bg-gray-900/80 backdrop-blur-md text-white border-b border-emerald-500/20">
      <h1 className="text-xl font-bold neon-text">Code<span className="text-emerald-400">Craft</span></h1>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
        <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
        <a href="#certifications" className="hover:text-emerald-400 transition-colors">Certifications</a>
        <a href="#blogs" className="hover:text-emerald-400 transition-colors">Blog</a>
        <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-emerald-500/20 md:hidden">
          <div className="flex flex-col p-4 space-y-3">
            <a href="#" className="hover:text-emerald-400 transition-colors" onClick={toggleMenu}>Home</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors" onClick={toggleMenu}>Projects</a>
            <a href="#certifications" className="hover:text-emerald-400 transition-colors" onClick={toggleMenu}>Certifications</a>
            <a href="#blogs" className="hover:text-emerald-400 transition-colors" onClick={toggleMenu}>Blog</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors" onClick={toggleMenu}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}
