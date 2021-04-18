import Url from 'url';
import getUrlWithParamsConfig from './getUrlsWithParamsConfig';

const corsUrl = "https://cors.bridged.cc/"

async function req<T>(serverType: string, endpoint: string, query: object = {} ): Promise<T> {
  const uri = Url.format(getUrlWithParamsConfig(serverType, endpoint, query))
  const res = await fetch(`${corsUrl}${uri}`).then((res) => res.json());
  return res;
}

export default req;