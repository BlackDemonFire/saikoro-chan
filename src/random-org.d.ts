declare module 'random-org' {
    interface ConstructorOptions {
        apiKey: string;
    }

    interface RandomOrgRPCResponse<T> {
        random: {
            // Array containing your requested random numbers or strings.
            data: T[];
            // The time that request was completed, in ISO 8601 format (parsable with new Date(isoString)).
            completionTime: string;
        };
        // The number of random bits generated in this request.
        bitsUsed: number;
        // An estimate of the number of remaining bits you can request.
        bitsLeft: number;
        // An estimate of the number of remaining api calls you can make.
        requestsLeft: number;
        // The recommended number of milliseconds you should wait before making another request.
        advisoryDelay: number;
    }

    interface GenerateStringsParams {
        // The number of random strings to generate (valid values: [1-10000]).
        n: number;
        // The length of each string you'd like generated.
        length: number;
        // The set of characters allowed to appear in the generated strings (maximum length: 80).
        // Unicode characters are supported.
        characters: string;
        // Whether or not the generated numbers can contain duplicates (default: true).
        replacement?: boolean;
    }

    interface GenerateIntegersParams {
        // The number of random integers to generate (valid values: [1-10000]).
        n: number;
        // Lower bound for random integers (valid values: [-1e9 - 1e9] and `< max`).
        min: number;
        // Upper bound for random integers (valid values: [-1e9 - 1e9] and `> min`).
        max: number;
        // Whether or not the generated numbers can contain duplicates (default: true).
        replacement?: boolean;
        // The base of the generated numbers (default: 10; valid values: 2, 8, 10 or 16).
        // If `base` is any value other than 10, the generated numbers will be returned as strings.
        base?: number;
    }

    export default class RandomOrg {
        constructor(opts: ConstructorOptions);
        generateStrings(params: GenerateStringsParams): Promise<RandomOrgRPCResponse<string>>;
        generateIntegers(params: GenerateIntegersParams): Promise<RandomOrgRPCResponse<number>>;
    }
}
