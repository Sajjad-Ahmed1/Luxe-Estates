import { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [toast, setToast] = useState(false);

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        setToast(true);
        setTimeout(() => setToast(false), 2500);
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, toast }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
