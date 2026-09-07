import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis;

    onModuleInit() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
        });

        this.client.on('connect', () => {
            console.log('Redis connected successfully');
        });
        
        this.client.on('error', (error) => {
            console.log('Redis connection error:', error);
        });
    }

    getClient(): Redis {
        return this.client;
    }

    public async set(
        key: string,
        value: string,
        ttl?: number,
    ): Promise<void> {
        if (ttl) {
            await this.client.set(key, value, 'EX', ttl);
            return;
        }

        await this.client.set(key, value);
    }

    public async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    public async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async exists(key: string): Promise<boolean> {
        const result = await this.client.exists(key);
        return result === 1;
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}
