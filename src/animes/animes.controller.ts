import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Anime } from '@prisma/client';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/role.decorator';
import { UserRole } from 'src/users/enum/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('animes')
export class AnimesController {
  constructor(private service: AnimesService) {}

  @Role(UserRole.ADMIN)
  @Post('create')
  @UseGuards(AuthGuard(), RolesGuard)
  createAnime(@Body() data: CreateAnimeDto): Promise<Anime> {
    return this.service.create(data);
  }

  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany(): Promise<Anime[]> {
    return this.service.findMany();
  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<Anime> {
    return this.service.findUnique(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.service.update(id, updateAnimeDto);
  }

  @Role(UserRole.ADMIN)
  @Delete('delete/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }

  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeAnime(@AuthUser() user: User, @Param('id') animeId: string): Promise<User> {
      const userId = user.id;
      return this.service.likeAnime(userId, animeId);
    }
}
