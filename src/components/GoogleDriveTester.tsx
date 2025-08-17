import React from 'react';

interface GoogleDriveTesterProps {
  className?: string;
}

const GoogleDriveTester: React.FC<GoogleDriveTesterProps> = ({ className = '' }) => {
  return (
    <div className={`google-drive-tester ${className}`}>
      <h2>Google Drive Tester</h2>
      <p>Componente em desenvolvimento...</p>
    </div>
  );
};

export default GoogleDriveTester;
