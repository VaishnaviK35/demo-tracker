import { configureStore } from "@reduxjs/toolkit";
import createOrganizationReducer from "../slices/createOrganizationSlice";

const store = configureStore({
  reducer: {
    createOrganization: createOrganizationReducer,
  },
});

export default store;
