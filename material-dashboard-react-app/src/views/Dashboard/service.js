import { get } from './../../utils/httpService';

const SERVICE_URLS = {
  arts: () => `arts`,
};

export const arts = (payload) => get(SERVICE_URLS.arts(), payload);