import { post } from "../../utils/httpService";

const SERVICE_URLS = {
  // signIn: () => `admin/superman/v1/admin-auth/signin`,
  login: () => `auth/login`,
  signup: () => `auth/signup`,
};

// export const signIn = (payload) => post(SERVICE_URLS.signIn(), payload);
export const login = (payload) => post(SERVICE_URLS.login(), payload);
export const signup = (payload) => post(SERVICE_URLS.signup(), payload);