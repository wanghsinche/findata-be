import { client as redisClient } from './cache'

export function getLimiter(
    fixedWindowSec: number,
    limitation: number
) {
    /**
     * https://redis.com/redis-best-practices/basic-rate-limiting/
     */
    return async function reachLimit(key: string) {
        
        if (!key) return true

        if (!redisClient.isReady){
            await redisClient.connect()
        }
        let suffix = Math.floor(Math.ceil(Date.now() / 1000) / fixedWindowSec)

        suffix %= 2 // it only need to distinct the odd time and even time

        const finalKey = `${key}@${suffix}`

        const currentCalls = await redisClient.get(finalKey)

        if (Number(currentCalls) >= limitation) {
            return true
        }
        
        await redisClient.multi().incr(finalKey).expire(finalKey, fixedWindowSec).exec()

        return false

    }

}