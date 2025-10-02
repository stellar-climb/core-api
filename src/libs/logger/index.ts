import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const { errors, combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }: { level: string; message: string; timestamp: string }) => {
  return `${timestamp} [${level}] : ${message}`;
});

export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize({ all: true }),
        utilities.format.nestLike('core-api', { prettyPrint: true, colors: true })
      ),
    }),
  ],
});
