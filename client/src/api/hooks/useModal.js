import { useState } from "react";

export const useModal = () => {
    const [open, setOpen] = useState();
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
  
    return { open, handleClose, handleOpen };
  };