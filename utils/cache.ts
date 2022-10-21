import { createClient, RedisClientType } from 'redis';
import { getRedisURL } from './constant';

export const client = createClient({
    url: getRedisURL()
});

client.on('error', (err) => console.log('Redis Client Error', err));    


function hashFunc(text:string) {
    var hash = 0,
      i, chr;
    if (text.length === 0) return String(hash);
    for (i = 0; i < text.length; i++) {
      chr = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return String(hash);
  }
  
  

export async function getCache(expireSeconds=300){ // 5min

    if (!client.isReady){    
        await client.connect();
    }
    
    return {
        async set (k:string, data: unknown){
            k = hashFunc(k)
            await client.setEx(k, expireSeconds, JSON.stringify(data))
        },
        async get<T extends unknown> (k:string){
            k = hashFunc(k)
            const result = await client.get(k)
            if (result) return JSON.parse(result) as T
        }
    }
} 

export async function getFromCacheOrRetrieveFromRemote<T extends unknown>(key:string, retrieveFunc:()=>Promise<T>, expireSeconds=300):Promise<T> {
    let cache 

    try {
        cache = await getCache(expireSeconds)

        const cacheData = await cache.get<T>(key)
    
        if (cacheData) return cacheData


    } catch (error) {
        console.error(error)        
    }

    const data = await retrieveFunc()


    try {
        if (!cache){
            cache = await getCache(expireSeconds)
        }
        await cache.set(key, data)
    } catch (error) {
        console.error(error)        
    }

    return data

}