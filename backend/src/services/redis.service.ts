import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private expirationTime = 60 * 60 * 24; // Cache for 1 day;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://redis:6379',
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 2) {
            // Stop retrying after 2 retries (3 attempts total)
            return false;
          }
          // Retry after 2^retries * 100 ms, max 2s
          return Math.min(2 ** retries * 100, 2000);
        },
      },
    });
    this.client.on('error', () => {
      console.error('Redis Client Error');
    });
    await this.client.connect();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.disconnect();
    }
  }

  getClient(): RedisClientType | null {
    if (!this.client || !this.client.isOpen) {
      return null; // Return null if client is not initialized or not open
    }
    return this.client;
  }

  async getKeys(pattern: string): Promise<string[]> {
    const client = this.getClient();
    if (!client) return [];
    return await client.keys(pattern);
  }

  async getCache(cacheKey: string): Promise<string | null> {
    const client = this.getClient();
    if (!client) return null;
    return await client.get(cacheKey);
  }

  async setCache(cacheKey: string, data: string): Promise<void> {
    const client = this.getClient();
    if (!client) return;
    await client.set(cacheKey, data, { EX: this.expirationTime });
  }

  async delCache(cacheKey: string): Promise<void> {
    const client = this.getClient();
    if (!client) return Promise.resolve();
    await client.del(cacheKey);
  }
}
