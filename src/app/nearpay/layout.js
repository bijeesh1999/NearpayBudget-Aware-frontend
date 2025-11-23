"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/src/app/nearpay/redux/store/store";
import { Sidebar } from "./components/sidebar";


export default function NearPayLayout({ children }) {

  return (
    <Provider store={store}>
      <Sidebar>{children}</Sidebar>
    </Provider>
  );
}
