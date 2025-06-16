import { useState, useCallback } from "react";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return;
    }

    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  }, []);

  return [copyToClipboard, isCopied] as const;
};

export default useClipboard;
