import useQuery from "./useQuery";
import {
  fetchTables,
  fetchTableById,
  fetchTableStatus,
  fetchTableFilters,
  fetchTableStats,
} from "../services/tableService";




export const useGetTable = (params) => {
  return useQuery(() => fetchTables(params), [JSON.stringify(params)]);
};

export const useTableByStatus = (status) => {
  return useQuery(() => fetchTableStatus(status), [status]);
};

export const useTableDetail = (id) => {
  return useQuery(() => fetchTableById(id), [id], !!id);
};

export const useTableFilters = () => {
  return useQuery(fetchTableFilters);
};

export const useTableStats = () => {
  return useQuery(fetchTableStats);
};
