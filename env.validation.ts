import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsNumber()
  PORT: number;
  @IsNumber()
  DB_PORT: number;
  @IsString()
  DB_HOST: string;
  @IsString()
  DB_USERNAME: string;
  @IsString()
  DB_PASSWORD: string;
  @IsString()
  DB_NAME: string;
  @IsString()
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  // plainInstance converts plain (literal) object to class (constructor) object.
  // So, the plain object now has access to the methods and properties of the class.
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    // Try to convert the value to the specified type.
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
