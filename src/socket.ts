import { serverIp } from '../src/env';

import io from 'socket.io-client';
const socket = io(`http://${serverIp}/chat`);
export default socket;
