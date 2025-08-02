import axiosInstance from "../utils/axiosInstance";


export const fetchALLTables = () => {
  return axiosInstance.get("/tables");
};

export const fetchTables = (params) => {
  return axiosInstance.get("/tables", { params });
};


export const fetchTablesRecoment = (guestCount) => {
  return axiosInstance.post("/tables/recommend", { guest_count: guestCount });
};


export const findGuestCount = (guestCount) => {
  return axiosInstance.post("/tables/search/by-guest", { guest_count: guestCount });
};


export const fetchTableById = (id) => {
  return axiosInstance.get(`/tables/${id}`);
};


export const fetchTableStatus = (status) => {
  return axiosInstance.get(`/tables/status/${status}`);
};



export const fetchTableFilters = () => {
  return axiosInstance.get("/tables/filters/options");
};

export const fetchTableStats = () => {
  return axiosInstance.get("/tables/stats/summary");
};



export const createTable = (tableData) => {
  return axiosInstance.post("/tables", tableData);
};


export const updateTable = (id, updatedData) => {
  return axiosInstance.put(`/tables/${id}`, updatedData);
};


export const updateTableStatus = (id, status) => {
  return axiosInstance.patch(`/tables/${id}/status`, { status });
};


export const deleteTable = (id) => {
  return axiosInstance.delete(`/tables/${id}`);
};
