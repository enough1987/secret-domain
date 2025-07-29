import { Injectable } from '@nestjs/common';
import { Photo } from '../../generated/prisma';
import { PrismaService } from './prisma.service';

@Injectable()
export class PhotoService {
  constructor(private prisma: PrismaService) {}

  async getPhotos(): Promise<Photo[] | { error: string; details: string }> {
    try {
      return await this.prisma.photo.findMany();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not read photos', details: message };
    }
  }

  async seedPhotos(
    count: number = 100,
  ): Promise<{ created: number } | { error: string; details: string }> {
    try {
      const photos: Photo[] = Array.from({ length: count }).map((_, i) => ({
        id: (i + 1).toString(),
        title: `Photo ${i + 1}`,
        url: `https://picsum.photos/seed/${i + 1}/600/400.webp`,
      }));
      await this.prisma.photo.createMany({ data: photos });
      return { created: count };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not generate photos', details: message };
    }
  }
}
