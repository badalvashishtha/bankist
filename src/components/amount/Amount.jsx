import React from "react";
import "./style.css";

function Amount({ amount, ...props }) {
  let type = amount < 0 ? "debit" : "credit";

  amount = Math.abs(amount);

  return (
    <div className={`amount ${type}`} {...props}>
      ₹ {amount}
    </div>
  );
}

export default Amount;
