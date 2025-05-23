import EventEmitter, { on } from "node:events";

export interface AppEvents {
  StatsUpdated: [stats: { count: number; status: string }[]];
}

type EventMap<T> = Record<keyof T, any[]>;

export default class IterableEventEmitter<
  T extends EventMap<T> = AppEvents,
> extends EventEmitter<T> {
  toIterable<TEventName extends keyof T & string>(
    eventName: TEventName,
    opts?: NonNullable<Parameters<typeof on>[2]>,
  ): AsyncIterable<T[TEventName]> {
    return on(this as any, eventName, opts) as any;
  }
}

export { on } from "node:events";
