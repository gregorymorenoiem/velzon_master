import { createSlice } from "@reduxjs/toolkit";
import { getAlarmsKpis, getAlarmsList, getAlarmsChartData } from "./thunk";

export interface AlarmsState {
  kpis: any[];
  alarmsList: any[];
  chartData: {
    monthlyStats: any[],
    codeDistribution: any[],
    temperatureSeries: any[],
    batterySeries: any[],
  };
  loading: boolean;
  error: string | null;
}

const initialState: AlarmsState = {
  kpis: [],
  alarmsList: [],
  chartData: {
    monthlyStats: [],
    codeDistribution: [],
    temperatureSeries: [],
    batterySeries: [],
  },
  loading: false,
  error: null,
};

const alarmsSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    // Aquí puedes agregar reducers para acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
      // Casos para getAlarmsKpis
      .addCase(getAlarmsKpis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlarmsKpis.fulfilled, (state, action) => {
        state.loading = false;
        // MODIFICACIÓN AQUÍ: Se añade '(as any)' para alinear los tipos.
        state.kpis = (action.payload as any) ?? [];
      })
      .addCase(getAlarmsKpis.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch alarm KPIs";
      })
      // Casos para getAlarmsList
      .addCase(getAlarmsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlarmsList.fulfilled, (state, action) => {
        state.loading = false;
        // MODIFICACIÓN AQUÍ: Se añade '(as any)' para alinear los tipos.
        state.alarmsList = (action.payload as any) ?? [];
      })
      .addCase(getAlarmsList.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch alarms list";
      })
      // Casos para getAlarmsChartData
      .addCase(getAlarmsChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlarmsChartData.fulfilled, (state, action) => {
        state.loading = false;
        // MODIFICACIÓN AQUÍ: Se añade '(as any)' para alinear los tipos.
        state.chartData = (action.payload as any) ?? initialState.chartData;
      })
      .addCase(getAlarmsChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch alarms chart data";
      });
  },
});

export default alarmsSlice.reducer;