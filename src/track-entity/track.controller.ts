import { Controller } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TracksService) {}
}
