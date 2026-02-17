
import React from 'react';

interface Props {
  onClick: () => void;
}

const SecretTrigger: React.FC<Props> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed top-0 right-0 w-[5px] h-[5px] bg-transparent hover:bg-white/10 z-[9999] cursor-default"
      aria-hidden="true"
      title="Secret Admin"
    />
  );
};

export default SecretTrigger;
