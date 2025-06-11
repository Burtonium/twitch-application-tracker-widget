import EventEmitter, { on } from "node:events";

export interface AppEvents {
  StatsUpdated: [stats: { count: number; status: string }[]];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventMap<T> = Record<keyof T, any[]>;

export default class IterableEventEmitter<
  T extends EventMap<T> = AppEvents,
> extends EventEmitter<T> {
  toIterable<TEventName extends keyof T & string>(
    eventName: TEventName,
    opts?: NonNullable<Parameters<typeof on>[2]>,
  ): AsyncIterable<T[TEventName]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return on(this as any, eventName, opts) as AsyncIterable<T[TEventName]>;
  }
}

export { on } from "node:events";
