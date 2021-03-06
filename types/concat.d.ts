import { EventStream, EventStreamOptions } from "./observable";
import Observable from "./observable";
/** @hidden */
export declare function concatE<V>(left: EventStream<V>, right: Observable<V>, options?: EventStreamOptions): EventStream<V>;
/**
 Concatenates given array of EventStreams or Properties. Works by subcribing to the first source, and listeing to that
 until it ends. Then repeatedly subscribes to the next source, until all sources have ended.

 See [`concat`](#observable-concat)
 */
export declare function concatAll<V>(...streams_: (Observable<V> | Observable<V>[])[]): EventStream<V>;
