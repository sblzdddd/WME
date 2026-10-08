import { hc } from 'hono/client';

import type { AppType } from '@baka-wme';

const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:8787').replace(/\/$/, '');

export const api = hc<AppType>(baseUrl);
