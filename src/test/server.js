import { setupServer } from "msw/node";
import { rest } from "msw";
import { config } from "dotenv";
import { afterAll, afterEach, beforeAll } from "@jest/globals";

export function createServer(handlerConfig) {

  const handler = handlerConfig.map((config) => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handler);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

}
