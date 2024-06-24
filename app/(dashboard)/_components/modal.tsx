import { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
                <button onClick={onClose} className="text-gray-700 hover:text-gray-900 transition absolute top-2 right-2">
                    <FaTimes size={20} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
