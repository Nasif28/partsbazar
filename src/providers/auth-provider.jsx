"use client";

import { loadUserFromStorage } from "@/redux/features/authSlice";
import { store } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
  const storeRef = useRef(store);

  // Load user from localStorage on initial load
  if (typeof window !== "undefined") {
    storeRef.current.dispatch(loadUserFromStorage());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
