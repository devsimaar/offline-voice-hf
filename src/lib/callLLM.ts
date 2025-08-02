export const callLLM = async (input: string): Promise<string> => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt: input }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return data.reply;
};
