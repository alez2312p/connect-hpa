import { useState } from 'react';
import QRCode from 'qrcode.react';
import React from 'react';
import Modal from './Modal';
import { usePusher } from '../hooks/usePusher';

const buttonConnect = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { qrData, loading, handleConnect, handleDisconnect } = usePusher(setIsModalOpen);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleDisconnect();
  };

  return (
    <div>
      <nav>
        {!qrData && <button className="buttonConnect" onClick={handleConnect}>Connect</button>}
      </nav>
      {loading && (
        <div className="loaderContainer">
          <span className="spinner"></span>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Código QR"
        description="Escanea este código QR con tu dispositivo para conectar de manera segura."
      >
        {qrData && <QRCode value={qrData} size={256} />}
      </Modal>
    </div>
  );
};

export default buttonConnect;
