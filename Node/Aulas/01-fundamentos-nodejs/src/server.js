import http from "node:http";

import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

//criar o servidor
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  //aguardar o middleware
  await json(req, res);

  //procura a rota
  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  //se existir a rota, execute o handler
  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  //caso nao exista a rota error 404
  return res.writeHead(404).end();
});
//escutar o servidor na porta 3333
server.listen(3333);
