import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TokenContext, RequestRequirements } from "../../../App";

const GetAdditional = () => {
  const requestRequirements = useContext(TokenContext);
  console.log(requestRequirements);

  return <div>GetAdditional</div>;
};

export default GetAdditional;
