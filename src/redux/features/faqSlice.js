import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { faqApi } from "../api/faqApi";

// Async thunk for fetching FAQs
export const fetchFAQs = createAsyncThunk("faqs/fetchAll", () =>
  faqApi.fetchFAQs()
);

// Helper function for filtering FAQs
const filterFAQs = (faqs, searchTerm, category) => {
  let filtered = [...faqs];

  // Filter by category
  if (category !== "All FAQs") {
    filtered = filtered.filter((faq) => faq.category === category);
  }

  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (faq) =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        (faq.keywords || []).some((keyword) =>
          keyword.toLowerCase().includes(term)
        )
    );
  }

  return filtered;
};

const initialState = {
  items: [],
  filteredItems: [],
  categories: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchTerm: "",
  selectedCategory: "All FAQs",
};

const faqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = filterFAQs(
        state.items,
        action.payload,
        state.selectedCategory
      );
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterFAQs(
        state.items,
        state.searchTerm,
        action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;

        // Extract unique categories
        const categories = [
          ...new Set(action.payload.map((faq) => faq.category)),
        ];
        state.categories = ["All FAQs", ...categories];
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { setSearchTerm, setCategory } = faqSlice.actions;

// Selectors
export const selectAllFAQs = (state) => state.faqs.filteredItems;
export const selectTopFAQs = (state) =>
  (state.faqs?.items || []).filter((faq) => faq.top);
export const selectFAQCategories = (state) => state.faqs.categories;
export const selectFAQStatus = (state) => state.faqs.status;
export const selectFAQError = (state) => state.faqs.error;
export const selectFAQSearchTerm = (state) => state.faqs.searchTerm;
export const selectFAQSelectedCategory = (state) => state.faqs.selectedCategory;
export const selectFAQFilteredItems = (state) => state.faqs.filteredItems;

export default faqSlice.reducer;
