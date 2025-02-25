const socket = io('https://vediocall-five.vercel.app/'); // Replace with your backend URL
const videoGrid = document.getElementById('videoGrid');

const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001' // This needs to match your backend configuration
});

const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream);

  myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', userId => {
    console.log('User connected: ' + userId);
    connectToNewUser(userId, stream);
  });

  socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close();
  });

  myPeer.on('open', id => {
    const urlParams = new URLSearchParams(window.location.search);
    const meetingId = urlParams.get('meetingId');
    socket.emit('join-room', meetingId, id);
  });
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });
  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}
