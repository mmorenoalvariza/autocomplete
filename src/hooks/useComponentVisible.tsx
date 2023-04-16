import { useEffect, useRef, useState } from "react";

const useOutsideClickHandler = (initialIsVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const outsideClickHandler = (event: MouseEvent) => {
    console.log(event.target);
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler, true);
    return () =>
      document.removeEventListener("click", outsideClickHandler, true);
  }, []);

  return { ref, isVisible, setIsVisible };
};

export default useOutsideClickHandler;
