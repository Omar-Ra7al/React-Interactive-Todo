import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PopupStatus({ status, variant }) {
  const [visibleVariant, setVisibleVariant] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleVariant("");
    }, 3000);

    setVisibleVariant(variant);
    return () => clearTimeout(timer);
  }, [variant]);

  return (
    <div className={`popup-status ${visibleVariant}`}>
      <p>{status}</p>
      <FaCheckCircle className="icon-check" />
    </div>
  );
}
