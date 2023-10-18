export interface FlakeIDParams {
    seq?: number;
    mid?: bigint;
    timeOffset?: number;
    lastTime?: number;
}
export declare class FlakeId {
    seq: number;
    mid: bigint;
    timeOffset: number;
    lastTime: number;
    constructor({ seq, mid, timeOffset, lastTime }?: FlakeIDParams);
    gen(): bigint;
}
export default FlakeId;
//# sourceMappingURL=flakeid.d.ts.map