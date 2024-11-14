import React from "react";

const Backdrop = ({
  children,
  onClose,
  className,
}: {
  children: React.ReactNode;
  onClose: () => void;
  className: any;
}) => {
  return (
    <div
      className={`fixed h-screen w-screen bg-black bg-opacity-50 flex z-20  ${className}`}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Backdrop;
