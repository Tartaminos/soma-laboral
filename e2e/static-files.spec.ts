import { expect, test } from "@playwright/test";

test("exports robots, sitemap, preset demos and a real 404", async ({
  request,
}) => {
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/demo/services/",
    "/demo/commerce/",
    "/demo/professional/",
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
  }

  const missing = await request.get("/route-that-does-not-exist/");
  expect(missing.status()).toBe(404);

  const invalidDemo = await request.get("/demo/invalid/");
  expect(invalidDemo.status()).toBe(404);
});
