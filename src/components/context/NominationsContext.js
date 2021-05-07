import React, { createContext, useState } from "react";

export const NominationsContext = createContext();

const NominationsContextProvider = (props) => {
  const [nominations, setNominations] = useState([]);

  return (
    <NominationsContext.Provider value={{ nominations, setNominations }}>
      {props.children}
    </NominationsContext.Provider>
  );
};

export default NominationsContextProvider;
