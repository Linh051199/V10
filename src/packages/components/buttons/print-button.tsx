import {BButton, BButtonProps} from "src/packages/components/buttons/base-button";

interface PrintButtonProps extends BButtonProps {
  label?: string;
  onClick?: () => void;
}
export const PrintButton = ({label="Print", onClick}: PrintButtonProps) => {
  return <BButton 
    label={label} 
    onClick={onClick}
  />
}