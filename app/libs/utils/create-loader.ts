import type { LoaderFunctionArgs, SerializeFrom } from '@remix-run/node';
import { defer, json, useLoaderData, useMatches, useRouteLoaderData } from '@remix-run/react';
import { useMemo } from 'react';

type DefaultLoaderType = any;
type Callback<DataT extends Record<string, any>> = (args: LoaderFunctionArgs) => DataT;

function getRouteId(path: string) {
  return 'routes' + path.replace(/\//g, '.').replace(/^./g, '/');
}

function useDataPrivate<DataT extends SerializeFrom<Record<string, any>>>() {
  const { data } = useLoaderData<DefaultLoaderType>();
  return data as DataT;
}

function useMatchDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(path: string) {
  const matchingRoutes = useMatches();

  const route = useMemo(() => matchingRoutes.find(route => route.id === getRouteId(path)), [matchingRoutes, path]) as any;
  return route?.data?.data as DataT | undefined;
}

function useRouteDataPrivate<DataT extends SerializeFrom<Record<string, any>>>(path: string) {
  const data = useRouteLoaderData<DefaultLoaderType>(getRouteId(path));
  return data?.data as DataT | undefined;
}

export function createDeferLoader<DataT extends Record<string, any>>(callback: Callback<DataT>, init?: number | ResponseInit) {
  function loader(args: LoaderFunctionArgs) {
    const data = callback(args);
    return defer({ data }, init);
  }

  function useData() {
    return useDataPrivate<Promise<SerializeFrom<DataT>>>();
  }

  function useRouteData(path: string) {
    return useRouteDataPrivate<Promise<SerializeFrom<DataT>>>(path);
  }

  function useMatchData(path: string) {
    return useMatchDataPrivate<Promise<SerializeFrom<DataT>>>(path);
  }

  return {
    loader,
    useData,
    useRouteData,
    useMatchData,
  };
}

export function createJsonLoader<DataT extends Record<string, any>>(callback: Callback<Promise<DataT>>, init?: number | ResponseInit) {
  async function loader(args: LoaderFunctionArgs) {
    const data = await callback(args);
    return json({ data }, init);
  }

  function useData() {
    return useDataPrivate<SerializeFrom<DataT>>();
  }

  function useRouteData(path: string) {
    return useRouteDataPrivate<SerializeFrom<DataT>>(path);
  }

  function useMatchData(path: string) {
    return useMatchDataPrivate<SerializeFrom<DataT>>(path);
  }

  return {
    loader,
    useData,
    useRouteData,
    useMatchData,
  };
}
