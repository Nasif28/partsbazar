"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";

const PageHeader = ({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
}) => {
  return (
    <div
      className="relative w-full text-center mx-auto pt-2 pb-6 overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(to right, rgba(var(--color-primary), 0.7), rgba(var(--color-primary-dark), 0.7)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-primary-dark))",
            }
      }
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-primary-dark via-primary to-primary-dark text-primary-foreground" />

      <div className="myContainer">
        <div className="container relative mx-auto z-10">
          <Breadcrumbs />

          <div className="text-center">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                className="mt-2 max-w-3xl mx-auto text-md md:text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {description}
              </motion.p>
            )}

            {buttonText && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  asChild
                  size="lg"
                  //   variant="destructive"
                  className="border-primary-dark bg-primary-dark/50 hover:bg-primary-dark border-2"
                >
                  <Link href={buttonLink || "#"}>{buttonText}</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
