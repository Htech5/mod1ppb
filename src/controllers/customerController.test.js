import assert from "node:assert";
import { validate } from "./customerController.js";

assert.strictEqual(validate({ email: "a@b.com", phone: "0812345678" }), null);
assert.match(validate({ email: "abc", phone: "0812345678" }), /@/);
assert.match(validate({ email: "a@b.com", phone: "0812" }), /10 karakter/);
assert.match(validate({}), /@/);
console.log("customer validation OK");
