import { X } from "lucide-react";
import type React from "react";

interface ModalProps {
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, className = "", children, title }) => {
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 p-4 ${className}`}
        >
            <div
                onClick={handleContentClick}
                className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden"
            >
                {(title || true) && (
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        {title && <span className="text-lg font-semibold">{title}</span>}
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close modal"
                        >
                            <X className="w-8 h-8 p-2 cursor-pointer bg-gray-200 rounded-full text-gray-600" />
                        </button>
                    </div>
                )}
                <div className="p-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;