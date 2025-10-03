import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const { errors, combine, timestamp, printf, colorize } = winston.format;

const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const logFormat = printf(({ level, message, timestamp }: { level: string; message: string; timestamp: string }) => {
  return `${yellow}${timestamp}${reset} [${level}] ${message}`;
});

export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize({ all: true }), logFormat),
    }),
  ],
});
