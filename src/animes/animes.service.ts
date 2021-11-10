import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Anime, User } from '@prisma/client';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Injectable()
export class AnimesService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.AnimeCreateInput): Promise<Anime> {
    const anime = await this.db.anime.create({ data });
    return anime;
  }

  async findMany(): Promise<Anime[]> {
    const animes = await this.db.anime.findMany();
    return animes;
  }

  async findUnique(id: string): Promise<Anime> {
    const anime = await this.db.anime.findUnique({
      where: { id },
    });

    if (!anime) {
      throw new NotFoundException(`Anime ${id} not found`);
    }

    return anime;
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto) {
    return this.db.user.update({
      where: { id: id },
      data: updateAnimeDto,
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.db.anime.delete({
      where: { id },
    });

    return {
      message: `${id} deleted successfully.`,
    };
  }

  async likeAnime(userId: string, animeId: string): Promise<User> {
    await this.db.user.update({
      where: { id: userId },
      data: {
        animes: {
          connect: {
            id: animeId,
          },
        },
      },
    });

    return this.db.user.findUnique({
      where: { id: userId },
      include: {
        animes: true,
      },
    });
  }
}
