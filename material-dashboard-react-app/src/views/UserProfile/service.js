import { put } from "../../utils/httpService";

const SERVICE_URLS = {
  updateProfile: (id) => `auth/${id}`,
};

// export const signIn = (payload) => post(SERVICE_URLS.signIn(), payload);
export const updateProfileAPI = (id, payload) => put(SERVICE_URLS.updateProfile(id), payload);