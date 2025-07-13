import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private expirationTime = 60 * 60 * 24; // Cache for 1 day;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://redis:6379',
    });
    this.client.on('error', (err: unknown) => {
      console.error('Redis Client Error', err);
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

  async getCashe(cacheKey: string): Promise<string | void> {
    const client = this.getClient();
    await client?.get(cacheKey);
  }

  async setCache(cacheKey: string, data: string): Promise<string | void> {
    const client = this.getClient();
    await client?.set(cacheKey, data, { EX: this.expirationTime });
  }

  async delCache(cacheKey: string): Promise<void> {
    const client = this.getClient();
    await client?.del(cacheKey);
  }
}
