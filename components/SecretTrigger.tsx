import React from 'react';

interface Props {
  onClick: () => void;
}

const SecretTrigger: React.FC<Props> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed top-0 right-0 w-[20px] h-[20px] bg-transparent hover:bg-black/5 z-[99999] cursor-default outline-none"
      aria-hidden="true"
      title="Terminal Access"
    />
  );
};

export default SecretTrigger;