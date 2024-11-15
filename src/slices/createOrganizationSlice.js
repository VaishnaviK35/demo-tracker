import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDetailsSubmitted: false,
  organizationListParams: {
    search: "",
    sortBy: "subdomain",
    sortOrder: "desc",
    perPage: 10,
  },
  organizationList: [],
};

const createOrganizationSlice = createSlice({
  name: "createOrganization",
  initialState,
  reducers: {
    formDetailsSubmitted: (state) => {
      state.formDetailsSubmitted = !state.formDetailsSubmitted;
    },
    organizationListParams: (state, payload) => {
      state.organizationListParams = {
        ...state,
        [payload.type]: payload.value,
      };
    },
    setOrganizationList: (state, payload) => {
      state.organizationList = payload;
    },
  },
});

export const { formDetailsSubmitted, organizationListParams, setOrganizationList } =
  createOrganizationSlice.actions;
export default createOrganizationSlice.reducer;
