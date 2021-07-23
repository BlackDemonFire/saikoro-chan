import randomorg from "random-org";
export abstract class Random {
    constructor() { }
    abstract int(min: number, max: number): number | Promise<number>;
    abstract choice<T>(options: Array<T>): T | Promise<T> | nil;
    abstract ints(min: number, max: number, amount: number): number[] | Promise<number[]>;
}
export class FakeRandom extends Random {
    constructor() { super(); }
    int(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    choice<T>(options: Array<T>): T | nil {
        if (!options) return;
        if (!(options instanceof Array)) return options;
        if (options.length == 1) return options[0];
        const res = this.int(0, options.length - 1);
        return options[res];
    }
    ints(min: number, max: number, count: number) {
        let result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(this.int(min, max));
        }
        return result;
    }
}
export class RealRandom extends Random {
    api;
    constructor(apiKey: string) {
        super();
        this.api = new randomorg({ apiKey });
    }
    async int(min: number, max: number): Promise<number> {
        if (max == min) return min;
        if (min > max) {
            [max, min] = [min, max];
        }
        const result = await this.api.generateIntegers({ min: min, max: max, n: 1 });
        return result.random.data[0];
    }
    async choice<T>(options: Array<T>): Promise<T> {
        if (!options) return;
        if (!(options instanceof Array)) return options;
        if (options.length == 1) return options[0];
        const res = await this.int(0, (options.length - 1));
        return options[res];
    }
    async ints(min: number, max: number, count: number) {
        if (max == min) return Array(count).fill(min);
        if (min > max) {
            [max, min] = [min, max];
        }
        const result = await this.api.generateIntegers({ min: min, max: max, n: count });
        const data: number[] = result.random.data;
        return data;
    }
}