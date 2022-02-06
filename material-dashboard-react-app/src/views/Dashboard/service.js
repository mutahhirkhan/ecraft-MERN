import { get } from './../../utils/httpService';

const SERVICE_URLS = {
  arts: (qs) => `arts${qs}`,
};

export const arts = (qs) => get(SERVICE_URLS.arts(qs));