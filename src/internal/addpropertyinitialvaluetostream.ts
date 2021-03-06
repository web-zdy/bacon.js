import "../concat";
import { noMore } from '../reply';
import {EventStream, allowSync } from "../observable";
import { describe } from '../describe';
import UpdateBarrier from './updatebarrier';
import { endEvent, Event } from '../event';
import { Property } from "../observable";;
import { EventSink } from "../types";

/** @hidden */
export default function addPropertyInitValueToStream<V>(property: Property<V>, stream: EventStream<V>): Property<V> {
  const justInitValue: EventStream<V> = new EventStream(
    describe(property, "justInitValue"), 
    function(sink: EventSink<V>) {
      let value: Event<V>;
      const unsub = property.dispatcher.subscribe(function(event: Event<V>) {
        if (!event.isEnd) {
          value = event;
        }
        return noMore;
      });
      UpdateBarrier.whenDoneWith(justInitValue, function() {
        if ((typeof value !== "undefined" && value !== null)) {
          sink(value);
        }
        return sink(endEvent());
      });
      return unsub;
    },
    undefined,
    allowSync
  );
  return justInitValue.concat(stream, allowSync).toProperty();
}
