import { createClient, RedisClientType } from 'redis';
import { getRedisURL } from './constant';

let client: RedisClientType

const expireSeconds = 300 // 5min

export async function getCache(){
    if (!client){
        client = createClient({
            url: getRedisURL()
        });
        
        client.on('error', (err) => console.log('Redis Client Error', err));    
    }

    if (!client.isReady){    
        await client.connect();
    }
    
    return {
        async set (k:string, data: unknown){
            await client.set(k, JSON.stringify(data))
            await client.expire(k, expireSeconds)
        },
        async get (k:string){
            const result = await client.get(k)
            if (result) return JSON.parse(result)
        }
    }
} 