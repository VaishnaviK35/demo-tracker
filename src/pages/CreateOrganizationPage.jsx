import React from "react";
import { FormDetails } from "../components/CreateOrganization/FormDetails";
import { DataTableDetails } from "../components/CreateOrganization/DataTableDetails";


export const CreateOrganization = () => {

  return (
    <div className=" grid gap-10">
      <section className=" place-items-center">
        <FormDetails />
      </section>
      <section className="data-table-details">
        <DataTableDetails />
      </section>
    </div>
  );
};
