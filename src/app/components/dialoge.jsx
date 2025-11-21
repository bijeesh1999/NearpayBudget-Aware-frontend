"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";

export default function CustomModalDialog({
  isOpen,
  closeModal,
  title,
  children,
}) {
  return (
    <>
      {/* Transition component handles the animation */}
      <Transition appear show={isOpen} as={Fragment}>
        {/* The Dialog component */}
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Backdrop (Modal Overlay) */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Tailwind classes for a dark, semi-transparent backdrop */}
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Dialog Container (Center the modal vertically/horizontally) */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* Modal Content Transition */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Modal Content Box */}
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      onClick={closeModal}
                      aria-label="Close dialog"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
