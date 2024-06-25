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

class Cache {
  private cache: Record<string, any> = {};

  private defaultId = { ___CACHE___: true };

  public get<DataT extends Record<string, any>>(args: LoaderFunctionArgs) {
    return this.cache?.[JSON.stringify(args?.params ?? this.defaultId)] as DataT;
  }

  public set<DataT extends Record<string, any>>(args: LoaderFunctionArgs, data: DataT) {
    this.cache[JSON.stringify(args?.params ?? this.defaultId)] = data;
  }

  public has(args: LoaderFunctionArgs) {
    return !!this.get(args);
  }

  public getAll() {
    return this.cache;
  }

  public clear() {
    this.cache = {};
  }
}

export function createDeferLoader<DataT extends Record<string, any>>(callback: Callback<DataT>, init?: number | ResponseInit) {
  let cache = new Cache();

  function loader(args: LoaderFunctionArgs) {
    const data = callback(args);
    return defer({ data, args }, init);
  }

  function useDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(): { data: DataT; args: LoaderFunctionArgs } {
    const { data, args } = useLoaderData<DefaultLoaderType>();
    const [dataState, setDataState] = useState<DataT>(cache.get(args) ?? data);

    useEffect(() => {
      setDataState(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
      if (args) {
        cache.set(args, dataState);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataState, args]);

    return { data: dataState, args };
  }

  function useData() {
    const { data } = useDataPrivate<Promise<SerializeFrom<DataT>>>();
    return data;
  }

  function Consumer({ fallback = null, children }: ConsumerProps<SerializeFrom<DataT>>) {
    const { data, args } = useDataPrivate<Promise<SerializeFrom<DataT>>>();

    const content = <Await resolve={data}>{children as any}</Await>;

    return <Suspense fallback={cache.has(args) ? content : fallback}>{content}</Suspense>;
  }

  return {
    loader,
    useData,
    Consumer,
  };
}

let prevLocationFromNavigation: Location | undefined;

export function createJsonLoader<DataT extends Record<string, any>>(callback: Callback<Promise<DataT>>, init?: number | ResponseInit) {
  let cache = new Cache();

  async function loader(args: LoaderFunctionArgs) {
    if (cache.has(args)) {
      return json({ data: cache.get(args), args, hasLoading: false }, init);
    }
    const data = await callback(args);
    cache.set(args, data);
    return json({ data, args }, init);
  }

  function useDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(
    callback: Callback<DataT>,
    isJson = false,
  ): { data: DataT; args: LoaderFunctionArgs; hasLoading: boolean } {
    const { data, args, hasLoading = true } = useLoaderData<DefaultLoaderType>();
    const [dataState, setDataState] = useState<DataT>(cache.get(args) ?? data);
    const [needFetch, setNeedFetch] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
      setDataState(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

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
      if (args) {
        cache.set(args, dataState);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataState, args]);

    return { data: dataState, args, hasLoading };
  }

  function useData() {
    const { data } = useDataPrivate<SerializeFrom<DataT>>(callback as any, true);
    return data;
  }

  return {
    loader,
    useData,
  };
}
