import { useCallback, useEffect, useRef, useState } from "react";

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

// Cursor-paginated list: `fetchPage(cursor)` returns { data, nextCursor }. Returns
// { items, loading, error, hasMore, loadMore, loadingMore, reload, setItems }.
export function usePagedApi(fetchPage, deps = []) {
  const [state, setState] = useState({
    items: [],
    nextCursor: null,
    loading: true,
    loadingMore: false,
    error: null,
  });
  // Ignores responses from a superseded query (filters changed while loading).
  const generation = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fetchPage, deps);

  const reload = useCallback(async () => {
    const gen = ++generation.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const page = await run(undefined);
      if (gen === generation.current)
        setState({
          items: page.data,
          nextCursor: page.nextCursor,
          loading: false,
          loadingMore: false,
          error: null,
        });
    } catch (error) {
      if (gen === generation.current)
        setState({
          items: [],
          nextCursor: null,
          loading: false,
          loadingMore: false,
          error,
        });
    }
  }, [run]);

  const loadMore = async () => {
    if (!state.nextCursor || state.loadingMore) return;
    const gen = generation.current;
    setState((s) => ({ ...s, loadingMore: true }));
    try {
      const page = await run(state.nextCursor);
      if (gen === generation.current)
        setState((s) => ({
          ...s,
          items: [...s.items, ...page.data],
          nextCursor: page.nextCursor,
          loadingMore: false,
        }));
    } catch (error) {
      if (gen === generation.current)
        setState((s) => ({ ...s, loadingMore: false, error }));
    }
  };

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    items: state.items,
    loading: state.loading,
    loadingMore: state.loadingMore,
    error: state.error,
    hasMore: Boolean(state.nextCursor),
    loadMore,
    reload,
    setItems: (update) =>
      setState((s) => ({
        ...s,
        items: typeof update === "function" ? update(s.items) : update,
      })),
  };
}

// Wraps a form submit or row action: { run, busy, error, setError }. `run` resolves to the
// action's result, or undefined when it failed (the error is kept for display).
export function useAction(action) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(action);
  ref.current = action;

  const run = useCallback(async (...args) => {
    setBusy(true);
    setError(null);
    try {
      return await ref.current(...args);
    } catch (err) {
      setError(err);
      return undefined;
    } finally {
      setBusy(false);
    }
  }, []);

  return { run, busy, error, setError };
}
