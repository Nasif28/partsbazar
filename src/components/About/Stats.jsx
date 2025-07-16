import { motion } from "framer-motion";

const stats = [
  { value: "50,000+", label: "Products Available" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Customer Support" },
  { value: "100,000+", label: "Happy Customers" },
];

export const Stats = () => (
  <section className="py-10 rounded-xl bg-primary text-primary-foreground">
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
);
