import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

type listenerType<dataT = any> = {
    eventName: string;
    handler: (data: dataT) => void;
};

export { eventEmitter };
export type { listenerType };
