export interface FlakeIDParams {
  seq?: number,
  mid?: bigint,
  timeOffset?: number
  lastTime?: number
}

const SEQ_BIT_SIZE = 12
const SEQ_MAX = (2 ** SEQ_BIT_SIZE) - 1

const MID_BIT_SIZE = 10;
const MID_MAX = (2 ** MID_BIT_SIZE) - 1

export class FlakeId {
  seq: number
  mid: bigint
  timeOffset: number
  lastTime: number

  constructor({ seq = 0, mid = 1n, timeOffset = 0, lastTime = 0 }: FlakeIDParams = {}) {
    if (mid > MID_MAX) {
      throw new Error(`'mid' cannot be larger than MID_MAX: ${mid} > ${MID_MAX}`)
    }

    this.seq = seq;
    this.mid = mid;
    this.timeOffset = timeOffset;
    this.lastTime = lastTime;
  }

  gen() {
    let time = Date.now()

    // get the sequence number
    if (this.lastTime == time) {
      this.seq += 1;

      if (this.seq > SEQ_MAX) {
        this.seq = 0;

        // make system wait till time is been shifted by one millisecond
        while (Date.now() <= time) { }

        time = Date.now()
      }
    } else {
      this.seq = 0;
    }

    this.lastTime = time;

    // (time << (MID_BIT_SIZE + SEQ_BIT_SIZE)) | (mid << (SEQ_BIT_SIZE)) | (seq)
    return (BigInt(time) << 22n) | (this.mid << 12n) | BigInt(this.seq);
  }
}

export default FlakeId