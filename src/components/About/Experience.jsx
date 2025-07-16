import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Experience = () => (
  <section className="py-16 rounded-xl text-center bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Ready to Experience the Partsbazar Difference?
    </h2>

    <p className="text-xl max-w-3xl mx-auto mb-8">
      Join thousands of satisfied customers who trust us for their automotive
      needs
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button variant="secondary" className="text-primary font-bold" size="lg">
        <Link href="/products">Shop Now</Link>
      </Button>

      <Button variant="outline" className="bg-transparent" size="lg">
        <Link href="/contact">Contact Us</Link>
      </Button>
    </div>
  </section>
);
