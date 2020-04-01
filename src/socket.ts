import io from 'socket.io-client';
const socket = io('http://13.125.249.151:3002/chat');
export default socket;
