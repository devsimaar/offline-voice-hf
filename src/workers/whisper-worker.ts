// src/workers/whisper.worker.ts

self.onmessage = async (e: MessageEvent) => {
  const { command, audio } = e.data;

  if (command === 'init') {
    // Simulate initialization
    self.postMessage({ status: 'ready' });
  }

  if (command === 'transcribe') {
    // Simulate transcription
    const dummyText = "This is a dummy transcription.";
    self.postMessage({ transcription: dummyText });
  }
};

export {};
