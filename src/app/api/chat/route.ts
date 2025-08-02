export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  return Response.json({ reply: data.choices?.[0]?.message?.content || 'No reply' });
}
