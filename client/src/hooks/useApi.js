import { useCallback, useEffect, useState } from "react";

// Runs an async API call on mount (and when deps change). Returns { data, error, loading, reload }.
export function useApi(fetcher, deps = []) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fetcher, deps);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    try {
      setState({ data: await run(), error: null, loading: false });
    } catch (error) {
      setState({ data: null, error, loading: false });
    }
  }, [run]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    ...state,
    reload,
    setData: (data) => setState((s) => ({ ...s, data })),
  };
}
