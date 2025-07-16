"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Truck,
  Settings,
  Users,
  Award,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Team members data
const teamMembers = [
  {
    name: "Ahmed Rahman",
    role: "Founder & CEO",
    bio: "15+ years in automotive industry with expertise in supply chain management.",
  },
  {
    name: "Fatima Khan",
    role: "Operations Director",
    bio: "Specialized in logistics and customer experience optimization.",
  },
  {
    name: "Sakib Hasan",
    role: "Technical Director",
    bio: "Automotive engineer with deep knowledge of vehicle systems and parts.",
  },
  {
    name: "Nusrat Jahan",
    role: "Customer Success Lead",
    bio: "Dedicated to ensuring every customer has an exceptional experience.",
  },
];

// Stats data
const stats = [
  { value: "50,000+", label: "Products Available" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Customer Support" },
  { value: "100,000+", label: "Happy Customers" },
];

const AboutUsPage = () => {
  return (
    <main className="min-h-screen">
      <div className="">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About Partsbazar
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Revolutionizing the automotive parts industry in Bangladesh with
                quality, convenience, and innovation
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Explore Our Products
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="myContainer">
          {/* Introduction Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 md:h-[500px] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <Settings className="w-24 h-24" />
                      <span className="sr-only">
                        Automotive parts illustration
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      <strong>Partsbazar</strong> is a leading online platform
                      in Bangladesh, dedicated to providing a wide range of
                      high-quality automobile parts and accessories. With a
                      user-friendly interface and seamless functionality,
                      Partsbazar offers an easy and reliable shopping experience
                      for car owners, mechanics, and businesses alike.
                    </p>
                    <p>
                      Founded in 2021 with Trade License: TRAD/DSCC/011983/2021,
                      Partsbazar has rapidly grown to become Bangladesh's
                      premier automotive parts destination. We address the needs
                      of car owners by providing authentic, high-quality car
                      parts alongside integrated services such as expert parts
                      knowledge and convenient delivery.
                    </p>
                    <p>
                      As Bangladesh's first comprehensive automotive platform,
                      Partsbazar takes care of everything a vehicle owner needs.
                      Customers can purchase genuine parts, arrange for
                      replacements, and even access services at their doorstep.
                      This streamlined approach saves time and effort, making
                      car maintenance a seamless experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  To become the first choice for car users by offering a
                  hassle-free, all-in-one automotive solution.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="h-full">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <ShieldCheck className="text-primary w-6 h-6" />
                    </div>
                    <CardTitle>Authenticity Guaranteed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      We're proud to be the authorized distributor of renowned
                      global brands, ensuring the authenticity and quality of
                      every product we sell.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Settings className="text-primary w-6 h-6" />
                    </div>
                    <CardTitle>Comprehensive Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      From high-quality spare parts to expert advice, we've
                      redefined convenience for car owners across Bangladesh.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Users className="text-primary w-6 h-6" />
                    </div>
                    <CardTitle>Customer-Centric Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Authenticity and quality are at the core of our
                      operations. We're committed to ensuring safety and
                      satisfaction for all our customers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">
                  Why Choose Partsbazar?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  We go beyond just selling parts - we provide complete
                  automotive solutions
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
                        <Check className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Extensive Product Catalog
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          As a specialized e-commerce platform, Partsbazar
                          features an extensive catalog of automobile parts,
                          including engine components, suspension parts, brakes,
                          batteries, electricals, filters, lighting, and a
                          variety of accessories for both domestic and imported
                          vehicles.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
                        <Truck className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Convenience & Reliability
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Partsbazar aims to make the process of buying
                          automobile parts as convenient as possible, offering
                          reliable delivery services that bring the products
                          directly to customers' doorsteps.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
                        <Award className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Quality Assurance
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          With a focus on quality and authenticity, the platform
                          ensures that all parts meet the highest standards and
                          are sourced from trusted manufacturers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 md:h-[500px] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Truck className="w-24 h-24 mx-auto mb-4" />
                      <p>Automotive parts delivery illustration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-lg">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Experienced professionals driving our automotive revolution
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gray-200 border-2 border-dashed w-full h-64"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the Partsbazar Difference?
              </h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Join thousands of satisfied customers who trust us for their
                automotive needs
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
