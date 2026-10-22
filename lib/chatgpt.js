import axios from 'axios';
import 'dotenv/config'

const perplexity = {
  api: {
    base: 'https://api.perplexity.ai/chat/completions',
    models: {
      'sonar-medium-online': { description: 'Online-enabled medium model', context: 12000 },
      'sonar-small-online': { description: 'Online-enabled small model', context: 12000 },
      'sonar-medium-chat': { description: 'Optimized medium chat model', context: 12000 },
      'sonar-small-chat': { description: 'Optimized small chat model', context: 12000 },
      'sonar-reasoning-pro': { description: 'Advanced reasoning model', context: 16384 },
      'sonar-pro': { description: 'Enhanced general purpose model', context: 8192 },
      'sonar': { description: 'Fast and efficient model', context: 4096 },
      'mixtral-8x7b-instruct': { description: 'Mixtral instruction model', context: 8192 },
      'codellama-70b-instruct': { description: 'Code specialized model', context: 8192 }
    },
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    keys: [process.env.PERPLEXITY_KEY].filter(Boolean),
    retry: { maxAttempts: 3, delayMs: 2000, timeoutMs: 60000 }
  },
  isParams: (messages, model, temperature) => {
    const errors = [];
    if (!messages || !Array.isArray(messages) || messages.length === 0) errors.push({ param: 'messages', error: 'messages vacío' });
    if (!model) errors.push({ param: 'model', error: 'model vacío' });
    else if (!perplexity.api.models[model]) errors.push({ param: 'model', error: 'model no existe' });
    if (temperature < 0 || temperature > 1) errors.push({ param: 'temperature', error: 'rango 0-1' });
    return errors;
  },
  key: () => {
    if (!perplexity.api.keys || perplexity.api.keys.length === 0) return null;
    return perplexity.api.keys[Math.floor(Math.random() * perplexity.api.keys.length)];
  },
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  retry: async (operation, attempt = 1) => {
    try { return await operation(); } 
    catch (error) {
      if (attempt >= perplexity.api.retry.maxAttempts) throw error;
      await perplexity.delay(perplexity.api.retry.delayMs * attempt);
      return await perplexity.retry(operation, attempt + 1);
    }
  },
  createAxiosInstance: () => axios.create({ baseURL: perplexity.api.base, timeout: perplexity.api.retry.timeoutMs }),
  getHeaders: (apiKey) => ({ 'Authorization': `Bearer ${apiKey}`, ...perplexity.api.headers }),
  chat: async (messages, model = 'sonar', temperature = 0.7) => {
    const ve = perplexity.isParams(messages, model, temperature);
    if (ve.length > 0) return { status: false, code: 400, result: { error: 'Parámetros inválidos', details: ve } };
    return await perplexity.retry(async () => {
      const axiosInstance = perplexity.createAxiosInstance();
      const perplexityKey = perplexity.key();
      if(!perplexityKey) throw new Error('Falta PERPLEXITY_KEY en .env - usa api gratis');
      const response = await axiosInstance.post('', { model, messages, temperature, max_tokens: 4096, stream: false }, { headers: perplexity.getHeaders(perplexityKey) });
      return { status: true, code: 200, result: { response: response.data.choices[0].message.content, model: { name: model, ...perplexity.api.models[model] } } };
    });
  }
};
export { perplexity };