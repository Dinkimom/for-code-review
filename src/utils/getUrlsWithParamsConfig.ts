import config from "../config";
// type serv = as keyof type config;
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["query"] }] */
function getUrlWithParamsConfig(serverType: string, endpointConfig: string, query: any) {
  const endpointConf = endpointConfig as keyof typeof config.client.endpoint;
  const servType = serverType as keyof typeof config.client.server
  
  const url = {
    ...config.client.server[servType],
    ...config.client.endpoint[endpointConf].url,
    query: {}
  }

  const { endpoint } = config.client;

  const pathname = Object.keys(query).reduce((acc, val) => {
    const arr = endpoint[endpointConf].params as any;
    if (arr.includes(val)) {
      const result = acc.replace(`{${val}}`, query[val])
      delete query[val]
      return result;
    }
    return acc;
  }, url.pathname)

  url.pathname = pathname
  url.query = {
    ...query,
  }

  return url;
}

export default getUrlWithParamsConfig;