import type { LoaderFunctionArgs, SerializeFrom } from '@remix-run/node';
import { Await, defer, json, useLoaderData, useNavigation } from '@remix-run/react';
import type { ReactNode } from 'react';
import { Suspense, useEffect, useState } from 'react';

type DefaultLoaderType = any;
type Callback<DataT extends Record<string, any>> = (args: LoaderFunctionArgs) => DataT;

export interface ConsumerProps<DataT extends SerializeFrom<Record<string, any>>> {
  fallback?: ReactNode;
  children: (data: DataT) => ReactNode;
}

export interface MatchConsumerProps<DataT extends SerializeFrom<Record<string, any>>> extends ConsumerProps<DataT> {
  path: string;
}

export interface RouteConsumerProps<DataT extends SerializeFrom<Record<string, any>>> extends MatchConsumerProps<DataT> {}

function useDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(callback: Callback<DataT>, prevData: DataT | null, isJson = false) {
  const { data, args } = useLoaderData<DefaultLoaderType>();
  const [dataState, setDataState] = useState<DataT>(prevData ?? data);
  const [needFetch, setNeedFetch] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setNeedFetch(navigation.state !== 'loading');
  }, [navigation.state]);

  useEffect(() => {
    if (needFetch) {
      if (isJson) {
        callback(args).then(setDataState).catch(console.error);
      } else {
        setDataState(callback(args));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needFetch, args]);

  return dataState as DataT;
}

function useConsumerDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(callback: Callback<DataT>, prevData: DataT | null) {
  const { data, args } = useLoaderData<DefaultLoaderType>();
  const [dataState, setDataState] = useState<DataT>(prevData ?? data);

  useEffect(() => {
    if (callback) {
      setDataState(callback(args));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: dataState, isLoading: !args };
}

export function createDeferLoader<DataT extends Record<string, any>>(callback: Callback<DataT>, init?: number | ResponseInit) {
  let cache: DataT | null = null;

  function loader(args: LoaderFunctionArgs) {
    if (cache) {
      return defer({ data: cache, args }, init);
    }
    const data = callback(args);
    cache = data;
    return defer({ data }, init);
  }

  function useData() {
    const data = useDataPrivate<Promise<SerializeFrom<DataT>>>(callback as any, cache as any);
    cache = data as any as DataT;
    return data;
  }

  function useConsumerData() {
    const data = useConsumerDataPrivate<Promise<SerializeFrom<DataT>>>(callback as any, cache as any);
    cache = data.data as any as DataT;
    return data;
  }

  function useCacheData() {
    return cache;
  }

  function Consumer({ fallback = null, children }: ConsumerProps<SerializeFrom<DataT>>) {
    const { data, isLoading } = useConsumerData();

    if (isLoading) {
      return (
        <Suspense fallback={fallback}>
          <Await resolve={data}>{children as any}</Await>
        </Suspense>
      );
    }

    return <Await resolve={data}>{children as any}</Await>;
  }

  function CacheConsumer({ children }: ConsumerProps<SerializeFrom<DataT>>) {
    if (!cache) {
      return null;
    }

    return <Await resolve={cache}>{children as any}</Await>;
  }

  return {
    loader,
    useData,
    useCacheData,
    Consumer,
    CacheConsumer,
  };
}

export function createJsonLoader<DataT extends Record<string, any>>(callback: Callback<Promise<DataT>>, init?: number | ResponseInit) {
  let cache: DataT | null = null;

  async function loader(args: LoaderFunctionArgs) {
    if (cache) {
      return json({ data: cache }, init);
    }
    const data = await callback(args);
    cache = data;
    return json({ data }, init);
  }

  function useData() {
    const data = useDataPrivate<SerializeFrom<DataT>>(callback as any, cache as any, true);
    cache = data as any as DataT;
    return data;
  }

  function useCacheData() {
    return cache;
  }

  return {
    loader,
    useData,
    useCacheData,
  };
}
