import { post } from "../../utils/httpService";

const SERVICE_URLS = {
  // signIn: () => `admin/superman/v1/admin-auth/signin`,
  login: () => `auth/login`,
};

// export const signIn = (payload) => post(SERVICE_URLS.signIn(), payload);
export const login = (payload) => post(SERVICE_URLS.login(), payload);