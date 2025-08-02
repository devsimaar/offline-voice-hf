export const transcribeAudio = (audioBlob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const worker = new Worker(
      new URL('../workers/whisper-worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (e) => {
      if (e.data.transcription) {
        resolve(e.data.transcription);
      }
    };

    worker.postMessage({ command: 'init' });

    setTimeout(() => {
      worker.postMessage({ command: 'transcribe', audio: audioBlob });
    }, 1000);
  });
};
