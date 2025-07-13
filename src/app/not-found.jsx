"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const generateStars = (count) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 1}px`,
    height: `${Math.random() * 4 + 1}px`,
    animationDuration: `${Math.random() * 3 + 1}s`,
    animationDelay: `${Math.random() * 2}s`,
  }));

const NotFoundPage = () => {
  const router = useRouter();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(20));
    const timer = setTimeout(() => {
      document.getElementById("astronaut")?.classList.add("animate-float");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Logo at top left */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
        <div className="w-30 h-30 relative">
          <Image
            src={logo}
            alt="Parts Bazar Logo"
            fill
            className="object-contain"
          />
        </div>
        {/* <h1 className="text-xl font-bold" style={{ color: "var(--primary)" }}>
          Parts Bazar
        </h1> */}
      </div>

      <div className="max-w-3xl w-full text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="relative w-64 h-64 mx-auto">
            {/* Planet */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-48 h-48 rounded-full shadow-2xl"
                style={{
                  background: "var(--primary)",
                  boxShadow: "0 0 30px var(--primary)",
                }}
              >
                <div
                  className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full"
                  style={{ background: "var(--primary-dark)" }}
                ></div>
                <div
                  className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full"
                  style={{ background: "var(--primary-dark)" }}
                ></div>
                <div
                  className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full"
                  style={{ background: "var(--primary-dark)" }}
                ></div>
              </div>
            </div>

            {/* Astronaut */}
            <div
              id="astronaut"
              className="absolute top-0 right-0 w-24 h-24 transition-all duration-1000 ease-in-out"
            >
              <div className="relative">
                <div
                  className="absolute w-16 h-20 rounded-full"
                  style={{ background: "var(--accent)" }}
                ></div>
                <div
                  className="absolute w-8 h-8 rounded-full top-4 left-4"
                  style={{ background: "var(--accent-foreground)" }}
                ></div>
                <div
                  className="absolute w-4 h-4 rounded-full top-8 left-6"
                  style={{ background: "var(--primary-foreground)" }}
                ></div>
                <div
                  className="absolute w-10 h-4 rounded top-16 left-3"
                  style={{ background: "var(--accent)" }}
                ></div>
                <div
                  className="absolute w-6 h-14 bg-white rounded top-4 -right-2 rotate-12"
                  style={{ background: "var(--accent)" }}
                ></div>
                <div
                  className="absolute w-6 h-14 bg-white rounded top-4 -left-2 -rotate-12"
                  style={{ background: "var(--accent)" }}
                ></div>
              </div>
            </div>

            {/* Stars */}
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full animate-pulse"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.width,
                  height: star.height,
                  animationDuration: star.animationDuration,
                  animationDelay: star.animationDelay,
                  background: "var(--primary)",
                }}
              ></div>
            ))}
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ color: "var(--primary)" }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ color: "var(--muted-foreground)" }}
        >
          Oops! The page you're looking for has drifted off into the cosmic
          void.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button
            onClick={() => router.push("/")}
            className="py-8 px-12 font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 0 20px var(--primary)",
            }}
          >
            Return to Earth
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Blog", path: "/blog" },
            { name: "Support", path: "/support" },
          ].map((item, index) => (
            <Button
              key={index}
              className="px-8 py-6 transition-all cursor-pointer backdrop-blur-sm"
              onClick={() => router.push(item.path)}
            >
              {item.name}
            </Button>
          ))}
        </motion.div>
      </div>

      {/* Space dust effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: "var(--primary)",
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
