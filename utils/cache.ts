import { createClient, RedisClientType } from 'redis';
import { getRedisURL } from './constant';

export const client = createClient({
    url: getRedisURL()
});

client.on('error', (err) => console.log('Redis Client Error', err));    

const expireSeconds = 300 // 5min

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
  
  

export async function getCache(){

    if (!client.isReady){    
        await client.connect();
    }
    
    return {
        async set (k:string, data: unknown){
            k = hashFunc(k)
            await client.setEx(k, expireSeconds, JSON.stringify(data))
        },
        async get (k:string){
            k = hashFunc(k)
            const result = await client.get(k)
            if (result) return JSON.parse(result)
        }
    }
} 