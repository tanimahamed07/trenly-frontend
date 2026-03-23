import ContractInformation from "@/components/contract/ContractInformation";
import MapIntegration from "@/components/contract/MapIntegration";
import ResponseTimeExpectation from "@/components/contract/ResponseTimeExpectation";
import React from "react";

const page = () => {
  return (
    <div>
      <ContractInformation></ContractInformation>
      <ResponseTimeExpectation></ResponseTimeExpectation>
      <MapIntegration></MapIntegration>
    </div>
  );
};

export default page;
