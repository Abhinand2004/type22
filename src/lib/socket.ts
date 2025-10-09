import { Server as IOServer } from "socket.io";
import type { Server as HttpServer } from "http";

type SocketServer = IOServer & { initialized?: boolean };

let io: SocketServer | null = null;

type ResLike = { socket?: { server?: unknown } };

export function getIO(res?: ResLike) {
  if (io) return io;
  const globalAny = global as unknown as { _io?: SocketServer };
  if (globalAny._io) {
    io = globalAny._io as SocketServer;
    return io;
  }
  // Lazily create if we have a Node listener available (only on dev server)
  if (res?.socket?.server) {
    io = new IOServer(res.socket.server as HttpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    }) as SocketServer;
    io.initialized = true;
    io.on("connection", (socket) => {
      socket.on("chat:send", (payload) => {
        const room = payload.chatId as string;
        socket.to(room).emit("chat:recv", payload);
      });
      socket.on("chat:join", (room: string) => {
        socket.join(room);
      });
    });
    globalAny._io = io;
  }
  return io;
}


