type Emiter<T> = (data: T) => void;

class EventEmiter<T> {
    private globalEmiterId = 0;
    private handlersMap: Map<number, Emiter<T>> = new Map();

    private data: T;

    constructor(data: T) {
        this.data = data;
    }

    subscribe(handler: Emiter<T>): number {
        let emiterId = this.globalEmiterId;
        this.globalEmiterId++;
        this.handlersMap.set(emiterId, handler);
        return emiterId;
    }

    unsubscribe(emiterId: number) {
        this.handlersMap.delete(emiterId);
    }

    set(data: T) {
        this.data = data;
        this.handlersMap.forEach((e) => {
            e(data);
        });
    }

    get(): T {
        return this.data;
    }
}

export default EventEmiter;
