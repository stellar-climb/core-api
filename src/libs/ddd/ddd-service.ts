import { Inject } from '@nestjs/common';
import { Context } from '../context';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class DddService {
  @Inject()
  context: Context;

  @InjectEntityManager()
  entityManager: EntityManager;

  @Inject()
  eventEmitter: EventEmitter2;
}
