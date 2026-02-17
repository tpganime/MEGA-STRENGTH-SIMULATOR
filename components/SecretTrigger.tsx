import React from 'react';

interface Props {
  onClick: () => void;
}

const SecretTrigger: React.FC<Props> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed top-0 right-0 w-[10px] h-[10px] bg-transparent hover:bg-black/5 z-[9999] cursor-default"
      aria-hidden="true"
      title="Terminal Access"
    />
  );
};

export default SecretTrigger;