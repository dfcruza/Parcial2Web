import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumPerformerService } from './album-performer.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumPerformerController {

    constructor( private readonly albumPerfomerService: AlbumPerformerService) {}

    @Post(':albumId/performers/:performerId')
    async addPerformerToAlbum(@Param('albumId') albumId: string, @Param('performerId') performerId: string) {
        return await this.albumPerfomerService.addPerformerToAlbum(albumId, performerId);
    }

    @Get(':albumId/performers/:performerId')
    async getAlbumPerformer(@Param('albumId') albumId: string, @Param('performerId') performerId: string) {
        return await this.albumPerfomerService.findPerformerByAlbumIdPerformerId(albumId, performerId);
    }
}
