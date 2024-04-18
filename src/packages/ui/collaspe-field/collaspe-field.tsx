import React, { useState } from "react";
import "./collaspe-field.scss";
import { Button } from "devextreme-react";

interface CollaspeFieldProps {
  caption?: string;
  children?: any;
}

export default function CollaspeField({
  caption,
  children,
}: CollaspeFieldProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
      <button onClick={toggleCollapse}>
        {isCollapsed ? "Expand" : "Collapse"}
      </button>
      <Button
        className={"ml-auto bg-[#E8F0F6]"}
        hoverStateEnabled={false}
        icon={"/images/icons/expand.svg"}
        onClick={toggleCollapse}
      />
      <div
        className={`collapse-content ${isCollapsed ? "collapsed" : "expanded"}`}
      >
        nội dung
      </div>
    </div>
  );
}
