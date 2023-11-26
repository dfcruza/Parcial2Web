import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/bussiness-errors';

@Injectable()
export class PerformerskService {

    constructor(

        @InjectRepository(PerformerEntity)
        private readonly performerskRepository: Repository<PerformerEntity>

    ) {}

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerskRepository.find({ relations: ['album']});
    }

    async findOne(id: string): Promise<PerformerEntity> {

        const performersk: PerformerEntity = await this.performerskRepository.findOne({ where: {id}, relations: ['album']});
        if (!performersk) {
            throw new BusinessLogicException(`Performer con el ID ${id} no encontrado`, BusinessError.NOT_FOUND);
        }
        return performersk;
    }

    async create(performersk: PerformerEntity): Promise<PerformerEntity> {
        if(performersk.descripcion.startsWith("")){
            throw new BusinessLogicException(`La descripcion del performer no puede estar vacia`, BusinessError.BAD_REQUEST);
        }
        return await this.performerskRepository.save(performersk);
    }

    async update(id: string, performersk: PerformerEntity): Promise<PerformerEntity> {

        const performerskToUpdate: PerformerEntity = await this.performerskRepository.findOne({ where: {id}});
        if (!performerskToUpdate) {
            throw new BusinessLogicException('Performer not found', BusinessError.NOT_FOUND);
        }

        performersk.id = id;

        return await this.performerskRepository.save(performersk);
    }

    async delete(id: string): Promise<void> {
        const performerskToDelete: PerformerEntity = await this.performerskRepository.findOne({ where: {id}});
        if (!performerskToDelete) {
            throw new BusinessLogicException('Performer not found', BusinessError.NOT_FOUND);
        }
        await this.performerskRepository.remove(performerskToDelete);
    }
}
