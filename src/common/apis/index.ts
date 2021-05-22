import Paths from './paths';
import { defaultBaseURL, BaseURLs } from './base_urls';

export const Apis = {
  baseURL: defaultBaseURL,
  baseURLs: BaseURLs,
  paths: Paths,
};

export default Apis;

export * from './base_urls';
export * from './paths';
