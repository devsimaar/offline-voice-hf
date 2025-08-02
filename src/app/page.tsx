'use client';
import { useEffect, useRef, useState } from 'react';
import { transcribeAudio } from '../lib/transcribeWorker';
import { callLLM } from '@/src/lib/callLLM';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks: Blob[] = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => audioChunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const text = await transcribeAudio(audioBlob);
      setTranscript(text);

      const response = await callLLM(text);
      setReply(response);

      const utterance = new SpeechSynthesisUtterance(response);
      speechSynthesis.speak(utterance);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <main className="p-4">
      <button onClick={recording ? stopRecording : startRecording} className="bg-blue-500 text-white px-4 py-2 rounded">
        {recording ? 'Stop Recording' : 'Start Talking'}
      </button>

      {transcript && (
        <div className="mt-4">
          <h3 className="font-bold">You said:</h3>
          <p>{transcript}</p>
        </div>
      )}

      {reply && (
        <div className="mt-4">
          <h3 className="font-bold">Assistant:</h3>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
