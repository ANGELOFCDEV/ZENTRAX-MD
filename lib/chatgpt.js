import axios from 'axios';

const perplexity = {
  api: {
    base: 'https://api.perplexity.ai/chat/completions',
    
    models: {
      'sonar-medium-online': {
        description: 'Online-enabled medium model',
        context: 12000
      },
      'sonar-small-online': {
        description: 'Online-enabled small model',
        context: 12000
      },
      'sonar-medium-chat': {
        description: 'Optimized medium chat model',
        context: 12000
      },
      'sonar-small-chat': {
        description: 'Optimized small chat model', 
        context: 12000
      },
      'sonar-reasoning-pro': {
        description: 'Advanced reasoning model with enhanced capabilities',
        context: 16384
      },
      'sonar-reasoning': {
        description: 'Balanced reasoning model',
        context: 8192
      },
      'sonar-pro': {
        description: 'Enhanced general purpose model',
        context: 8192
      },
      'sonar': {
        description: 'Fast and efficient model',
        context: 4096
      },
      'mixtral-8x7b-instruct': {
        description: 'Mixtral instruction model',
        context: 8192
      },
      'codellama-70b-instruct': {
        description: 'Code specialized model',
        context: 8192
      },
      'llama-2-70b-chat': {
        description: 'LLaMA 2 chat model',
        context: 4096
      }
    },

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Postify/1.0.0'
    }, 