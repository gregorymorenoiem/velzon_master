import { createSlice } from "@reduxjs/toolkit";
import { getDevicesKpis, getDevicesList, getDevicesChartData } from "./thunk"; // Modificar import

export interface DevicesState {
  kpis: any[];
  devicesList: any[];
  chartData: any[]; // Añadir propiedad para datos del gráfico
  loading: boolean;
  chartLoading: boolean; // Añadir estado de carga específico para el gráfico
  error: string | null;
}

const initialState: DevicesState = {
  kpis: [],
  devicesList: [],
  chartData: [], // Inicializar propiedad
  loading: false,
  chartLoading: false, // Inicializar
  error: null,
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
 reducers: {
    resetDevices(state) {
      state.kpis = [];
      state.devicesList = [];
      state.chartData = []; // Añadir reset
      state.loading = false;
      state.chartLoading = false;
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
      })
      // Casos nuevos para getDevicesChartData
      .addCase(getDevicesChartData.pending, (state) => {
        state.chartLoading = true;
        state.error = null;
      })
      .addCase(getDevicesChartData.fulfilled, (state, action) => {
        state.chartLoading = false;
        state.chartData = (action.payload as any) ?? [];
      })
      .addCase(getDevicesChartData.rejected, (state, action) => {
        state.chartLoading = false;
        state.error = (action.payload as any) || action.error.message || "Failed to fetch chart data";
      });
  },
});

export const { resetDevices } = devicesSlice.actions;
export default devicesSlice.reducer;