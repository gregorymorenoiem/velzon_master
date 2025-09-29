import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDevicesKpis as getDevicesKpisApi,
  getDevicesList as getDevicesListApi,
  getDevicesChartData as getDevicesChartDataApi
} from "../../helpers/fakebackend_helper";

// Thunk existente para KPIs (sin cambios)
export const getDevicesKpis = createAsyncThunk("device/getDevicesKpis", async () => {
  try {
    const response = getDevicesKpisApi();
    return response;
  } catch (error) {
    return error;
  }
});

// Thunk para lista de dispositivos (sin cambios)
export const getDevicesList = createAsyncThunk("device/getDevicesList", async () => {
  try {
    const response = getDevicesListApi();
    return response;
  } catch (error) {
    return error;
  }
});

// --- CORRECCIÓN AQUÍ ---
// Se elimina el try/catch para que createAsyncThunk maneje los errores automáticamente.
export const getDevicesChartData = createAsyncThunk(
  "device/getDevicesChartData",
  async (params: { year: number, month: number }) => {
    const response = await getDevicesChartDataApi(params);
    return response;
  }
);