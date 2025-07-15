import faqsData from "@/data/faqs.json";

// Development: Mock API
const fetchFAQsMock = () =>
  new Promise((resolve) => setTimeout(() => resolve(faqsData), 500));

// Production: Real API
const fetchFAQsReal = async () => {
  const response = await fetch("/api/faqs");
  return await response.json();
};

export const faqApi = {
  fetchFAQs: fetchFAQsMock,
};
// export const faqApi = {
//   fetchFAQs:
//     process.env.NODE_ENV === "development" ? fetchFAQsMock : fetchFAQsReal,
// };
