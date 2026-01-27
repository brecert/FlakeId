export interface FlakeIDParams {
    seq?: number;
    mid?: bigint;
    timeOffset?: number;
    lastTime?: number;
}
export interface DecodedFlakeId {
    timestamp: number;
    mid: bigint;
    seq: number;
}
export declare class FlakeId {
    seq: number;
    mid: bigint;
    timeOffset: number;
    lastTime: number;
    constructor({ seq, mid, timeOffset, lastTime }?: FlakeIDParams);
    gen(): bigint;
    decode(id: bigint): DecodedFlakeId;
}
export default FlakeId;
//# sourceMappingURL=flakeid.d.ts.map