"use client";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function FAQAccordion({ faqs }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="faq-001" //first faq id
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-b py-2">
          <AccordionTrigger className="text-left  group hover:no-underline py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-primary group-hover:bg-primary-dark text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">Q</span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {faq.question}
                </h3>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="py-3 px-4 pl-12">
            <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">A</span>
              </div>

              <div className="prose prose-gray font-normal dark:prose-invert max-w-none">
                <p className="">{faq.answer}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
