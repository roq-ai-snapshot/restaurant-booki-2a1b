import axios from 'axios';
import queryString from 'query-string';
import { BillingsInterface, BillingsGetQueryInterface } from 'interfaces/billings';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBillings = async (
  query?: BillingsGetQueryInterface,
): Promise<PaginatedInterface<BillingsInterface>> => {
  const response = await axios.get('/api/billings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBillings = async (billings: BillingsInterface) => {
  const response = await axios.post('/api/billings', billings);
  return response.data;
};

export const updateBillingsById = async (id: string, billings: BillingsInterface) => {
  const response = await axios.put(`/api/billings/${id}`, billings);
  return response.data;
};

export const getBillingsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/billings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBillingsById = async (id: string) => {
  const response = await axios.delete(`/api/billings/${id}`);
  return response.data;
};
