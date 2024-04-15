import { Server as NetServer } from 'http';
import { Socket, Server as SocketServer } from 'socket.io';
import { Server as ServerIO } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: Any, res: Any) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const httpServer = res.socket.server as NetServer;
    const io = new ServerIO(httpServer, {
      /* options */
    });

    io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }

  res.end();
}

// q: hwo can i use this in my app?
// a: import this file in your server.ts file
// q: where is server.ts file?


export default ioHandler;