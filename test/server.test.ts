import { logger } from "../logger";
import { server } from "../server";
import request from "supertest";

describe("server", () => {
  beforeAll(() => {
    logger.silent = true;
  });

  it("should run server", async () => {
    request(server).get("/").expect(400);
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });
});
