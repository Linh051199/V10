import React from "react";
import { PopupBox } from "@packages/ui/base-gridview/components/popup";

interface DeleteMultipleConfirmationBoxProps {
  title: string;
  message: string;
  onYesClick: () => void;
  onNoClick: () => void;
  visible: boolean;
}

export const DeleteMultipleConfirmationBox = (
  {
    title,
    message,
    onNoClick,
    onYesClick,
    visible
  }: DeleteMultipleConfirmationBoxProps) => {
  const handleYesClick = () => {
    onYesClick();
  };

  const handleNoClick = () => {
    onNoClick();
  };

  return (
    <PopupBox
      visible={visible}
      title={title}
      message={message} onYesClick={handleYesClick} onNoClick={handleNoClick} />
  )
}
