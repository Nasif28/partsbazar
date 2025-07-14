import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  PhoneCall,
  Mails,
} from "lucide-react";
import Image from "next/image";
import RedX from "./../SVG/RedX.svg";
import SteedFast from "./../SVG/SteadFast.svg";
import Pathao from "./../SVG/Pathao.svg";
import bKash from "./../SVG/bKash.svg";
import Nagad from "./../SVG/Nagad.svg";
import VISA from "./../SVG/VISA.svg";
import Rocket from "./../SVG/Rocket.svg";
import PlayStore from "./../SVG/PlayStore.svg";
import AppStore from "./../SVG/AppStore.svg";
import { PBLogo } from "@/assets/Import";

const footerData = {
  quickLinks: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Return & Refund Policy", href: "/refund" },
    { name: "Promotional Offer", href: "/offers" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
  ],
  companyLinks: [
    { name: "Our Story", href: "/our-story" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
    { name: "Investors", href: "/investors" },
    { name: "Sustainability", href: "/sustainability" },
  ],
  deliveryPartners: [
    { name: "RedX", icon: RedX },
    {
      name: "SteedFast",
      icon: SteedFast,
    },
    { name: "Pathao", icon: Pathao },
  ],
  paymentPartners: [
    { name: "bKash", icon: bKash },
    { name: "Nagad", icon: Nagad },
    { name: "Rocket", icon: Rocket },
    { name: "Visa", icon: VISA },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="myContainer">
        <div className="container mx-auto pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Section 1: Logo, Description, Contact Info, Social */}
            <div className="space-y-1">
              <div className="flex items-center">
                <Image
                  src={PBLogo}
                  alt="Parts Bazar Logo"
                  width={120}
                  height={120}
                />
              </div>

              <p className="text-textLight text-sm">
                Your Trusted Online Store for Genuine Vehicle Parts. Explore the
                Latest Trends and Enjoy Hassle-Free Shopping. Shop with
                Confidence, Drive with Excellence.
              </p>

              <div className="space-y-3 text-sm py-4">
                <div className="flex items-center">
                  <PhoneCall className="h-5 w-5 text-blue-400 mr-2" />
                  <span>01322910470, 01322910471</span>
                </div>
                <div className="flex items-center">
                  <Mails className="h-5 w-5 text-blue-400 mr-2" />
                  <span>sales@partsbazar.com.bd</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-400 mr-2" />
                  <span>
                    122-123 Fantasia AC Market Banglamotor, Dhaka-1000
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  target="_blank"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Section 2: Quick Menu */}
            <div className="space-y-8 pt-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-gray-700">
                  Quick Menu
                </h3>

                <ul className="space-y-3 text-textLight text-sm">
                  {footerData.quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">
                  Our Delivery Partner
                </h4>

                <div className="flex flex-wrap gap-2">
                  {footerData.deliveryPartners.map((partner, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded-md flex items-center justify-center"
                    >
                      <Image
                        src={partner.icon}
                        alt={partner.name}
                        width={50}
                        height={30}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Our Company */}
            <div className="space-y-8 pt-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-gray-700">
                  Our Company
                </h3>

                <ul className="space-y-3 text-textLight text-sm">
                  {footerData.companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div>
                  <h4 className="font-medium text-white mb-3">
                    Payment Partners
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {footerData.paymentPartners.map((partner, index) => (
                      <div
                        key={index}
                        className="bg-white py-1 px-2 rounded-md flex items-center justify-center"
                      >
                        <Image
                          src={partner.icon}
                          alt={partner.name}
                          width={40}
                          height={30}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Map, Partners */}
            <div className="space-y-8 pt-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-gray-700">
                  Visit Us
                </h3>

                {/* Google Map Integration */}
                <div className="h-44 rounded-lg mb-6 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.013993705835!2d90.39649417602284!3d23.746880388910203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8913a476625%3A0x4b2a8a21b4657668!2sFantasia%20Motor%20Parts%20AC%20Market!5e0!3m2!1sen!2sbd!4v1751715399968!5m2!1sen!2sbd"
                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.561884114956!2d90.39144888641252!3d23.762997833288214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c761e03c2f25%3A0x5e81dc24f86b39b7!2sMultibrand%20Workshop%20Ltd.!5e0!3m2!1sen!2sbd!4v1751696717925!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Parts Bazar Location"
                  ></iframe>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">
                  Download App on Mobile
                </h4>

                <div className="flex flex-wrap gap-2">
                  <Link href="#" target="_blank">
                    <Image
                      src={PlayStore}
                      alt="Google Play Store"
                      width={120}
                      height={40}
                    />
                  </Link>
                  <Link href="#" target="_blank">
                    <Image
                      src={AppStore}
                      alt="Google Play Store"
                      width={120}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 my-6"></div>

      {/* Copyright */}
      <div className="myContainer">
        <div className="container mx-auto pb-6">
          <div className="text-center text-textLight text-sm">
            <p>
              partsbazar.com.bd is a registered trademark of its respective
              owners.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Parts Bazar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
