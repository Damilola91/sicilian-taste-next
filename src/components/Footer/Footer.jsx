import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* LOGO + QUOTE */}
          <div>
            <h2 className="text-3xl font-extrabold text-orange-500 mb-3">
              SicilianTaste
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              “On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled.”
            </p>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              SicilianTaste
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-orange-400 transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="hover:text-orange-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#feedback"
                  className="hover:text-orange-400 transition-colors"
                >
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#terms"
                  className="hover:text-orange-400 transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#conditions"
                  className="hover:text-orange-400 transition-colors"
                >
                  Conditions
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="hover:text-orange-400 transition-colors"
                >
                  Cookies
                </a>
              </li>
              <li>
                <a
                  href="#copyright"
                  className="hover:text-orange-400 transition-colors"
                >
                  Copyright
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow</h4>
            <div className="flex gap-4 mt-2">
              <a
                href="#facebook"
                className="hover:text-orange-400 transition-colors"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#twitter"
                className="hover:text-orange-400 transition-colors"
              >
                <Twitter size={22} />
              </a>
              <a
                href="#instagram"
                className="hover:text-orange-400 transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#youtube"
                className="hover:text-orange-400 transition-colors"
              >
                <Youtube size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SicilianTaste — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
