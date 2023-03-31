import io from 'socket.io-client';
import React from 'react';

export const socket = io.connect('http://localhost:20617', {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "header"
      }
  });
export const SocketContext = React.createContext();
