import { useState } from "react";

export function useWindowSize(windowSize) {

const [isMenuOpen, setIsMenuOpen] = useState(false);

useEffect(() => {
  window.addEventListener('resize', () => {
    window.innerWidth > 600 ? setIsMenuOpen(true) : setIsMenuOpen(false);
  });
  return () => {
    isMenuOpen
  }
}, []);
}