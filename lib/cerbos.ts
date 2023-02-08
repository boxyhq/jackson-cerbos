import { GRPC } from "@cerbos/grpc";

// Use "localhost:3593" and `{ tls: false }` to connect with Cerbos local server
export const cerbos = new GRPC("localhost:3593", { tls: false });
