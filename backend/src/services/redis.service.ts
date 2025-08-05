import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType | null = null;
  private expirationTime = 60 * 60 * 24; // Cache for 1 day;
  private readonly logger = new Logger(RedisService.name);

  async onModuleInit() {
    try {
      this.client = createClient({
        url: process.env.REDIS_URL || 'redis://redis:6379',
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 2) {
              return false;
            }
            return Math.min(2 ** retries * 100, 2000);
          },
        },
      });
      await this.client.connect();
      this.logger.log('Redis connected');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        `Redis not available, continuing without cache. Error: ${message}`,
      );
      this.client = null;
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.disconnect();
    }
  }

  getClient(): RedisClientType | null {
    if (!this.client || !this.client.isOpen) {
      return null;
    }
    return this.client;
  }

  async getKeys(pattern: string): Promise<string[]> {
    const client = this.getClient();
    if (!client) return [];
    try {
      return await client.keys(pattern);
    } catch {
      return [];
    }
  }

  async getCache(cacheKey: string): Promise<string | null> {
    const client = this.getClient();
    if (!client) return null;
    try {
      return await client.get(cacheKey);
    } catch {
      return null;
    }
  }

  async setCache(cacheKey: string, data: string): Promise<void> {
    const client = this.getClient();
    if (!client) return;
    try {
      await client.set(cacheKey, data, { EX: this.expirationTime });
    } catch {
      // ignore
    }
  }

  async delCache(cacheKey: string): Promise<void> {
    const client = this.getClient();
    if (!client) return;
    try {
      await client.del(cacheKey);
    } catch {
      // ignore
    }
  }
}
