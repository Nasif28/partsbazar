import { motion } from "framer-motion";

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

export const Team = () => (
  <section className="py-10">
    <div className="max-w-4xl mx-auto text-center mb-10">
      <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Experienced professionals driving our automotive revolution
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-2">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-200 border-2 border-dashed w-full md:h-64 h-44"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-primary mb-3">{member.role}</p>
            <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
