import api from "./api";

import type { APIResponse } from "./types";

export const getData = async <T>(url: string) => {
  return (await api.get(url))?.data as APIResponse<T>;
};

export const postData = async <T = {}, P = {}>(url: string, payload: T) => {
  return (await api.post(url, payload))?.data as APIResponse<P>;
};

export const updateData = async <T = {}, P = {}>(url: string, payload: T) => {
  return (await api.put(url, payload))?.data as APIResponse<P>;
};

export const patchData = async <T = {}, P = {}>(url: string, payload?: T) => {
  return (await api.patch(url, payload))?.data as APIResponse<P>;
};

export const deleteData = async (url: string) => {
  return (await api.delete(url))?.data as APIResponse<any>;
};
