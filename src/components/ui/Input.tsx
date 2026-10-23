"use client";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};

export default Input;
