import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAlarmsKpis as getAlarmsKpisApi,
  getAlarmsList as getAlarmsListApi,
  getAlarmsChartData as getAlarmsChartDataApi,
} from "../../helpers/fakebackend_helper";

// Thunk para obtener los KPIs de alarmas
export const getAlarmsKpis = createAsyncThunk("alarm/getAlarmsKpis", async () => {
  const response = await getAlarmsKpisApi();
  return response;
});

// Thunk para obtener la lista de alarmas
export const getAlarmsList = createAsyncThunk("alarm/getAlarmsList", async () => {
  const response = await getAlarmsListApi();
  return response;
});

// Thunk para obtener los datos de los gráficos de alarmas
export const getAlarmsChartData = createAsyncThunk("alarm/getAlarmsChartData", async () => {
  const response = await getAlarmsChartDataApi();
  return response;
});