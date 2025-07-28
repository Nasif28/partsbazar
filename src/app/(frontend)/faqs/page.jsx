"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFAQs,
  selectAllFAQs,
  selectFAQError,
  selectFAQStatus,
  setCategory,
  setSearchTerm,
} from "@/redux/features/faqSlice";
import { Button } from "@/components/ui/button";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import FAQFilter from "@/components/FAQ/FAQFilter";
import PageHeader from "@/components/Global/PageHeader";

export default function FAQPage() {
  const dispatch = useDispatch();
  const faqs = useSelector(selectAllFAQs);
  const status = useSelector(selectFAQStatus);
  const error = useSelector(selectFAQError);
  const searchTerm = useSelector((state) => state.faqs.searchTerm);
  const selectedCategory = useSelector((state) => state.faqs.selectedCategory);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFAQs());
    }
  }, [status, dispatch]);

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Frequently Asked Questions"
        description=" Find answers to common questions about our products, services, and
            policies. Can't find what you're looking for? Contact our support
            team."
      />

      <section className="myContainer">
        <div className="container mx-auto py-6">
          <FAQFilter />

          {status === "loading" && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          )}
          {status === "succeeded" && (
            <>
              {/* {(searchTerm || selectedCategory !== "All FAQs") &&
              faqs.length > 0 && (
                <div className="mb-6 text-gray-600 dark:text-gray-400">
                  Showing {faqs.length} result{faqs.length !== 1 ? "s" : ""}
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedCategory !== "All FAQs" &&
                    ` in "${selectedCategory}"`}
                </div>
              )} */}

              {faqs.length === 0 ? (
                <div className="rounded-xl shadow-sm border  p-8 text-center">
                  <div className="text-5xl mb-4">🤔</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No FAQs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchTerm
                      ? `We couldn't find any FAQs matching "${searchTerm}"`
                      : "We couldn't find any FAQs in this category"}
                  </p>
                  <Button
                    onClick={() => {
                      dispatch(setSearchTerm(""));
                      dispatch(setCategory("All FAQs"));
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <FAQAccordion faqs={faqs} />
                </div>
              )}
            </>
          )}
          {status === "failed" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
                Failed to load FAQs
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
              <Button variant="outline" onClick={() => dispatch(fetchFAQs())}>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
