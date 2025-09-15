import { createSlice } from "@reduxjs/toolkit";
import { getDevicesKpis, getDevicesList } from "./thunk"; // Modificar import

export interface DevicesState {
  kpis: any[];
  devicesList: any[]; // Añadir propiedad para lista de dispositivos
  loading: boolean;
  error: string | null;
}

const initialState: DevicesState = {
  kpis: [],
  devicesList: [], // Inicializar propiedad
  loading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    resetDevices(state) {
      state.kpis = [];
      state.devicesList = []; // Añadir reset
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos existentes para getDevicesKpis
      .addCase(getDevicesKpis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDevicesKpis.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = (action.payload as any) ?? [];
      })
      .addCase(getDevicesKpis.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any) || action.error.message || "Failed to fetch device KPIs";
      })
      // Casos nuevos para getDevicesList
      .addCase(getDevicesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDevicesList.fulfilled, (state, action) => {
        state.loading = false;
        state.devicesList = (action.payload as any) ?? [];
      })
      .addCase(getDevicesList.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any) || action.error.message || "Failed to fetch devices list";
      });
  },
});

export const { resetDevices } = devicesSlice.actions;
export default devicesSlice.reducer;