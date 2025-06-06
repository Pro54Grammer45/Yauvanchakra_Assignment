import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    settingItem: [] as any[],
  },
  reducers: {
    addSetting: (state: any, action: any) => {
      const existsItem = state.settingItem.find(
        (x: any) => x.name === action.payload.name
      );
      if (existsItem) {
        return {
          ...state,
          settingItem: state.settingItem.map((x: any) => {
            if (x.name === existsItem.name) {
              return x;
            }
            return x;
          }),
        };
      } else {
        return {
          ...state,
          settingItem: [...state.settingItem, action.payload],
        };
      }
    },
    removeSetting: (state: any, action: any) => {
      return {
        ...state,
        settingItem: state.settingItem.filter((x: any) => x.name !== action.payload),
      };
    },

    clearSetting: (state: any) => {
      return {
        ...state,
        settingItem: [],
      };
    },
  },
});

export const { addSetting, removeSetting, clearSetting } = settingSlice.actions;

export default settingSlice.reducer;
