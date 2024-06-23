import type { LoaderFunctionArgs, SerializeFrom } from '@remix-run/node';
import type { Location } from '@remix-run/react';
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

class Cache extends Map {
  public get<DataT extends Record<string, any>>(args: LoaderFunctionArgs) {
    return super.get(JSON.stringify(args)) as DataT;
  }

  public set<DataT extends Record<string, any>>(args: LoaderFunctionArgs, data: DataT) {
    return super.set(JSON.stringify(args), data);
  }

  public has(args: LoaderFunctionArgs) {
    return super.has(JSON.stringify(args));
  }
}

let prevLocationFromNavigation: Location | undefined;

function useDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(callback: Callback<DataT>, cache: Cache, isJson = false) {
  const { data, args } = useLoaderData<DefaultLoaderType>();
  const [dataState, setDataState] = useState<DataT>(cache.get(args) ?? data);
  const [needFetch, setNeedFetch] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setNeedFetch(navigation.state !== 'loading' && !!prevLocationFromNavigation);
    prevLocationFromNavigation = navigation.location;
  }, [navigation]);

  useEffect(() => {
    if (needFetch && args) {
      if (isJson) {
        callback(args).then(setDataState).catch(console.error);
      } else {
        setDataState(callback(args));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needFetch, args]);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  useEffect(() => {
    if (args) {
      cache.set(args, dataState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataState, args]);

  return { data: dataState, args };
}

export function createDeferLoader<DataT extends Record<string, any>>(callback: Callback<DataT>, init?: number | ResponseInit) {
  let cache = new Cache();

  function loader(args: LoaderFunctionArgs) {
    if (cache.has(args)) {
      return defer({ data: cache.get(args), args }, init);
    }
    const data = callback(args);
    cache.set(args, data);
    return defer({ data }, init);
  }

  function useData() {
    const { data } = useDataPrivate<Promise<SerializeFrom<DataT>>>(callback as any, cache as any);
    return data;
  }

  function useConsumerData() {
    const data = useDataPrivate<Promise<SerializeFrom<DataT>>>(callback as any, cache);
    return data;
  }

  function useCacheData() {
    return cache;
  }

  function clearCache() {
    cache.clear();
  }

  function Consumer({ fallback = null, children }: ConsumerProps<SerializeFrom<DataT>>) {
    const { data, args } = useConsumerData();
    const hasLoading = !args;

    if (hasLoading) {
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
    clearCache,
    Consumer,
    CacheConsumer,
  };
}

export function createJsonLoader<DataT extends Record<string, any>>(callback: Callback<Promise<DataT>>, init?: number | ResponseInit) {
  let cache = new Cache();

  async function loader(args: LoaderFunctionArgs) {
    if (cache.has(args)) {
      return json({ data: cache.get(args), args }, init);
    }
    const data = await callback(args);
    cache.set(args, data);
    return json({ data }, init);
  }

  function useData() {
    const { data } = useDataPrivate<SerializeFrom<DataT>>(callback as any, cache, true);
    return data;
  }

  function useCacheData() {
    return cache;
  }

  function clearCache() {
    cache.clear();
  }

  return {
    loader,
    useData,
    useCacheData,
    clearCache,
  };
}
