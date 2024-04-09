import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
    if (!isOpen) return null;

    return (
        <div className='modalContainer'>
            <div className='modalContent'>
                <button onClick={onClose} className='closeButton'>X</button>
                <h2>{title}</h2>
                <p>{description}</p>
                {children}
            </div>
        </div>
    );
};

export default Modal;
