import { MainContext } from "../src/index.js";
import { describe, expect, it } from "vitest";

describe("MainContext", () => {
  it("render custom lines", () => {
    const main = new MainContext({
      $line0: "# line 0",
      http: [
        {
          $line1: "# line 1",
          server: [
            {
              $line2: "# line 2",
              location: [
                {
                  config: "/",
                  spec: {
                    $line3: "# line 3",
                  },
                },
              ],
              $line4: "# line 4",
            },
          ],
          $line5: "# line 5",
        },
      ],
      $line6: "# line 6",
    });

    expect(main.toString()).toMatchInlineSnapshot(`
      "# line 0
      http {
        # line 1
        server {
          # line 2
          location / {
            # line 3
          }
          # line 4
        }
        # line 5
      }
      # line 6"
    `);
  });
});
