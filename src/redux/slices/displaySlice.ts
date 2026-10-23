import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compliance: true,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setComplianceTrue: (state) => {
      state.compliance = true;
    },
    setComplianceFalse: (state) => {
      state.compliance = false;
    },
  },
});

export const { setComplianceTrue, setComplianceFalse } = displaySlice.actions;
export default displaySlice.reducer;
