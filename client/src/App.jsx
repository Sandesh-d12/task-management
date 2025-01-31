import { useSelector } from "react-redux";
import "./App.css";
import { AllRoute } from "./Route";
import { useEffect, useState, createContext } from "react";

// Create Modal Context
export const ModalContext = createContext();

function App() {
  const userData = useSelector((state) => state.auth.data);

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsModal(true);
    }
  }, [userData]);

  const toggleModal = () => {
    setIsModal((prev) => !prev); 
  };

  return (
    <ModalContext.Provider value={{ isModal, toggleModal, setIsModal }}>
      <AllRoute />
    </ModalContext.Provider>
  );
}

export default App;
