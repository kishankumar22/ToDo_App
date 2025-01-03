import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <a href="#about" className="hover:text-gray-400">About Us</a>
          <a href="#services" className="hover:text-gray-400">Services</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
          <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
        </div>
        <div className="flex space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
        <p className="text-center text-sm">&copy; 2024 Mezzex. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;