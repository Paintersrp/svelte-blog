import { Level, TransportSingleOptions } from 'pino';
import { LoggerNames } from './enums';


export type LoggerControllerConfig = {
  name: LoggerNames;
  level?: Level;
  streams?: TransportSingleOptions[];
  verbose?: boolean;
};

export interface LoggerConfig {
  [name: string]: LoggerControllerConfig;
}

export interface LogInterface {
  name: LoggerNames;
  level: Level;
  message: string;
  obj?: Record<string, any>;
}
