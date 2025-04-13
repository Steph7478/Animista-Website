import { useState } from "react";

export default function useToggleModal() {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return { modal, toggleModal };
}
