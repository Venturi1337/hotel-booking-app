// config/config.service.ts
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private config: any;

  constructor() {
    // Ruta absoluta relativa al directorio de ejecución (no __dirname)
    const configPath = path.join(process.cwd(), 'config/config.json');
    const raw = fs.readFileSync(configPath, 'utf-8');
    this.config = JSON.parse(raw);
  }

  get dataType(): 'FS' | 'DB' {
    return this.config.DATA_TYPE;
  }

  get fsFolder(): string {
    return this.config.FS_FOLDER;
  }

  get mongoUri(): string {
    return this.config.MONGO_URI;
  }
}
