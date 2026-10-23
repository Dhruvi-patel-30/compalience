import { createSlice } from "@reduxjs/toolkit";
import { complianceConfig } from "@/config/profileConfig";

const initialState = {
  activeComplianceTab: complianceConfig[6]?.id ?? "",
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setActiveComplianceTab: (state, action) => {
      state.activeComplianceTab = action.payload;
    },
  },
});

export const { setActiveComplianceTab } = detailSlice.actions;
export default detailSlice.reducer;
