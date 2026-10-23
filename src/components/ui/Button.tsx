import React, { ComponentType } from "react";

interface ButtonProps {
  label?: string;
  icon?: ComponentType<{ className?: string }>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: IconComponent,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`border  rounded-xl flex items-center gap-2 ${className} cursor-pointer`}
    >
      {IconComponent && <IconComponent className="w-4 h-4 " />}
      {label}
    </button>
  );
};

export default Button;
