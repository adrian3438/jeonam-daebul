import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={contentLabel}
        >
            <h2>{contentLabel}</h2>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default CustomModal;
