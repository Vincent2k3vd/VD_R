import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  // Đóng modal khi nhấn ESC
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Ngăn scroll body khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-lg",
    large: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center  backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-auto`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Đóng modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Component con để dễ sử dụng
const ModalHeader = ({ children }) => <div className="mb-4">{children}</div>;

const ModalBody = ({ children }) => <div className="mb-4">{children}</div>;

const ModalFooter = ({ children }) => (
  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
    {children}
  </div>
);

export default Modal;
export { ModalHeader, ModalBody, ModalFooter };
import { X } from "lucide-react";
