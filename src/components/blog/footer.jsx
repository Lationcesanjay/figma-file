import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const BlogFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Training Blog
          </h2>
          <p className="text-sm">
            Welcome to our technical blog, where we delve into the world of
            cutting-edge technologies and explore their practical applications.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">CATEGORY</h2>
          <ul className="space-y-2">
            <li>
              <p>HTML</p>
            </li>
            <li>
              <p>CSS</p>
            </li>
            <li>
              <p>JAVASCRIPT</p>
            </li>
            <li>
              <p>VS CODE</p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:info@example.com"
                className="hover:text-gray-400 transition duration-300"
              >
                info@example.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+123456789"
                className="hover:text-gray-400 transition duration-300"
              >
                +123 456 789
              </a>
            </li>
            <li>Address: 123 Blog Street, City, Country</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              className="hover:text-gray-400 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook/> Facebook
            </a>
            <a
              href="https://x.com/"
              className="hover:text-gray-400 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter/> Twitter
            </a>
            <a
              href="https://www.instagram.com/"
              className="hover:text-gray-400 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram/> Instagram
            </a>
            <a
              href="https://www.linkedin.com/"
              className="hover:text-gray-400 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin/> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm mt-8 border-t border-gray-700 pt-4 px-6">
  <p className="text-sm">&copy; {new Date().getFullYear()} Your Blog.</p>
  <p className="text-sm">All rights reserved.</p>
</div>

    </footer>
  );
};
