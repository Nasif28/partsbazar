"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFAQs,
  selectFAQError,
  selectFAQStatus,
  selectTopFAQs,
} from "@/redux/features/faqSlice";
import FAQAccordion from "../FAQ/FAQAccordion";
import SectionHeader from "../Global/SectionHeader";

export default function FAQSection() {
  const dispatch = useDispatch();
  const topFAQs = useSelector(selectTopFAQs);
  const status = useSelector(selectFAQStatus);
  const error = useSelector(selectFAQError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFAQs());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <section className="secP bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Frequently Asked Questions"
            href="/faqs"
            linkText="View All FAQs"
          />

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Error loading FAQs: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="myContainer">
      <div className="container mx-auto py-6">
        <SectionHeader
          title="Frequently Asked Questions"
          href="/faqs"
          linkText="View All FAQs"
        />

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <FAQAccordion faqs={topFAQs.slice(0, 5)} />
        </div>
      </div>
    </section>
  );
}
