import Contexto from "./Contexto";

import React, { useState } from "react";

export default function UsingContext(props) {
  const { children } = props;

  const [currentId, setCurrentId] = useState("");

  return (
    <Contexto.Provider value={{ currentId, setCurrentId }}>
      {children}
    </Contexto.Provider>
  );
}
