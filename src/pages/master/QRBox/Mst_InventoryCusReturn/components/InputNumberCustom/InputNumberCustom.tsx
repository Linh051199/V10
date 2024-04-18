import React, { useState } from "react";

export default function InputNumberCustom() {
  const [value, setValue] = useState(0);
  const handleValueChange = (event: any) => {
    const parsedValue = parseFloat(event.target.value);
    if (!isNaN(parsedValue)) {
      setValue(event.target.value);
    }
  };

  const formatNumber = (number: any) => {
    // Convert the number to a string
    let formattedNumber = number.toString();

    // Split the string into integer and decimal parts
    const parts = formattedNumber.split(".");

    // Format integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Format decimal part
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2); // Limit decimal places to 2
    }

    // Join integer and decimal parts with a dot
    formattedNumber = parts.join(".");

    return formattedNumber;
  };
  return (
    <>
      <input
        type="text"
        value={formatNumber(value)}
        onChange={handleValueChange}
      />
    </>
  );
}
