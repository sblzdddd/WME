import { useEffect, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { api } from '@/lib/api';

type HelloState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; message: string };

export function HelloFromApi() {
  const [state, setState] = useState<HelloState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    api.hello
      .$get()
      .then(async (response) => {
        if (cancelled) return;
        if (!response.ok) {
          setState({ status: 'error', message: `error ${response.status}` });
          return;
        }
        const data = await response.json();
        setState({ status: 'ready', message: data.message });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', message: 'unreachable' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const text = state.status === 'loading' ? 'loading…' : state.message;

  return <ThemedText type="small">{text}</ThemedText>;
}
