import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* LOGO + QUOTE */}
          <div>
            <h2 className="text-3xl font-extrabold text-orange-500 mb-3">
              SicilianTaste
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Una piattaforma dedicata ai presìdi Slow Food e alle eccellenze
              siciliane, per sostenere i piccoli produttori locali.
            </p>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              SicilianTaste
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-orange-400 transition"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-400 transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-orange-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-orange-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow</h4>
            <div className="flex gap-4 mt-2">
              <Facebook
                className="hover:text-orange-400 transition"
                size={22}
              />
              <Twitter className="hover:text-orange-400 transition" size={22} />
              <Instagram
                className="hover:text-orange-400 transition"
                size={22}
              />
              <Youtube className="hover:text-orange-400 transition" size={22} />
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
