import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigService {
  private config: any;

  constructor() {
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
    console.log(process.env.MONGO_URI);
    return process.env.MONGO_URI || '';
  }
}
