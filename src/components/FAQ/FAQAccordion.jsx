"use client";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQAccordion({ faqs }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-2"
      defaultValue="faq-001" //first faq id
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="py-2 border-2 rounded-lg group bg-secondary data-[state=open]:bg-primary data-[state=open]:text-white transition-colors"
        >
          <AccordionTrigger className="text-left hover:no-underline py-3 px-4 [&[data-state=open]>svg]:text-white transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-primary group-hover:bg-primary-dark group-data-[state=open]:bg-primary-dark text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">Q</span>
              </div>

              <div>
                <h3 className="font-semibold">{faq.question}</h3>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="py-3 px-4 pl-12">
            <div className="flex items-center gap-4">
              <div className="bg-background text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">A</span>
              </div>

              <div className="prose prose-gray font-normal opacity-90 dark:prose-invert max-w-none">
                <p className="">{faq.answer}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
