import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getDevicesKpis as getDevicesKpisApi, 
  getDevicesList as getDevicesListApi // Añadir import
} from "../../helpers/fakebackend_helper";

// Thunk existente para KPIs
export const getDevicesKpis = createAsyncThunk("device/getDevicesKpis", async () => {
  try {
    const response = getDevicesKpisApi();
    return response;
  } catch (error) {
    return error;
  }
});

// Nuevo thunk para lista de dispositivos
export const getDevicesList = createAsyncThunk("device/getDevicesList", async () => {
  try {
    const response = getDevicesListApi();
    return response;
  } catch (error) {
    return error;
  }
});