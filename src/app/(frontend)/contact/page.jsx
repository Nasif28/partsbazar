"use client";
import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
// import Map from "@/components/Contact/Map";
const Map = dynamic(() => import("@/components/Contact/Map"), {
  ssr: false,
});
import ContactForm from "@/components/Contact/ContactForm";
import { contactInfo, socialLinks } from "@/lib/constants";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/assets/Import";
import dynamic from "next/dynamic";

// Social icon components
const SocialIcon = ({ icon, url, name }) => {
  const Icons = {
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedInIcon />,
    youtube: <YouTubeIcon />,
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted hover:text-primary-foreground transition-colors"
      aria-label={name}
    >
      {Icons[icon]}
    </a>
  );
};

const ContactCard = ({ icon, title, content }) => (
  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border shadow-sm">
    <div className="p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <div className="text-gray-600 text-sm whitespace-pre-line">{content}</div>
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <main className="myContainer">
      <div className="min-h-screen py-10 container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We're here to help with any questions about our automotive parts and
            services.
          </p>
        </div>

        {/* Main Content */}
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                <div className="space-y-4">
                  <ContactCard
                    icon={<MapPin size={24} />}
                    title="Our Location"
                    content={contactInfo.address}
                  />

                  <ContactCard
                    icon={<Phone size={24} />}
                    title="Call Us"
                    content={contactInfo.phone}
                  />

                  <ContactCard
                    icon={<Mail size={24} />}
                    title="Email Us"
                    content={contactInfo.email}
                  />

                  <ContactCard
                    icon={<Clock size={24} />}
                    title="Working Hours"
                    content={contactInfo.hours}
                  />
                </div>

                {/* Social Media */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <SocialIcon
                        key={social.name}
                        icon={social.icon}
                        url={social.url}
                        name={social.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-full">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <section className="pb-6">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <h2 className="text-2xl font-bold mb-4">Find Us on Map</h2>
            <Map />
          </div>
        </section>

        {/* FAQ CTA */}
        <div className="pb-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-textLight max-w-2xl mx-auto mb-6">
              Check out our FAQ section for quick answers to common questions
              about orders, shipping, returns, and more.
            </p>
            <a
              href="/faqs"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Visit FAQ Section
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
