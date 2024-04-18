import Button, { IButtonOptions } from "devextreme-react/button";
import { Icon, IconName } from "@packages/ui/icons";
import { match, P } from "ts-pattern";
import "./base-button.scss";
export interface BButtonProps extends IButtonOptions {
  iconName?: IconName;
  label?: string;
}
export const BButton = ({
  label = "Print",
  iconName,
  onClick,
  type = "default",
  className = "",
  ...rest
}: BButtonProps) => {
  return (
    <Button
      stylingMode={"contained"}
      type={type}
      text={label}
      onClick={onClick}
      className={`base-button ${className}`}
      {...rest}
    >
      {match(iconName)
        .with(P.nullish, () => null)
        .otherwise(() => (
          <Icon className={"mr-2"} size={13} name={iconName!} />
        ))}
      {match(label)
        .with(P.nullish, () => null)
        .otherwise(() => (
          <span className={""}>{label}</span>
        ))}
    </Button>
  );
};
