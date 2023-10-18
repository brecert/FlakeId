import FlakeId from "@brecert/flakeid"

const MAX_U5 = (2 ** 5) - 1
const WORKER_ID = 16
const SERVER_ID = 16

const createMID = (a, b) => {
    if (a > MAX_U5 || b > MAX_U5) throw new Error(`value too large`)
    return BigInt((a << 5) | (b))
}

const flake = new FlakeId({ mid: createMID(WORKER_ID, SERVER_ID) })
console.log(flake.gen())