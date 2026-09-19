import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`
});

export const getShipments = async (search = '', status = '') => {
  const response = await api.get('/ship', {
    params: {
      search: search || undefined,
      status: status || undefined
    }
  });

  return response.data;
};

export const createShipment = async (shipmentData) => {
  const response = await api.post('/ship', shipmentData);

  return response.data;
};

export const getShipmentById = async (id) => {
  const response = await api.get(`/ship/${id}`);

  return response.data;
};

export const updateShipmentStatus = async (id, status) => {
  const response = await api.patch(`/ship/${id}/status`, {
    status
  });

  return response.data;
};

export const getShipmentHistory = async (id) => {
  const response = await api.get(`/ship/${id}/history`);

  return response.data;
};