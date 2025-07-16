import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Header = () => (
  <section className="overflow-hidden">
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
  </section>
);
