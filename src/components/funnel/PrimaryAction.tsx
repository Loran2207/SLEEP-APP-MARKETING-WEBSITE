import { Button } from "@/components/primitives/Button";

type PrimaryActionProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function PrimaryAction({
  children,
  onClick,
  href,
  disabled,
  type,
}: PrimaryActionProps) {
  return (
    <Button
      href={href}
      size="lg"
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="h-14 w-full text-[16px]"
    >
      {children}
    </Button>
  );
}
