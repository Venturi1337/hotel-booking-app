import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

type Metadata = {
  TOTAL_REGISTRIES: number;
  LAST_INDEX: number;
};

@Injectable()
export class FileStorageService {
  async ensureEntityFolder(basePath: string, entity: string) {
    const folderPath = path.join(basePath, entity);
    await fs.mkdir(folderPath, { recursive: true });

    const metadataPath = path.join(folderPath, '_metadata.json');
    try {
      await fs.access(metadataPath);
    } catch {
      const initial: Metadata = { TOTAL_REGISTRIES: 0, LAST_INDEX: 0 };
      await this.writeJson(metadataPath, initial);
    }
  }

  async incrementMetadata(basePath: string, entity: string): Promise<void> {
    const metadataPath = path.join(basePath, entity, '_metadata.json');
    const raw = await fs.readFile(metadataPath, 'utf-8');
    const metadata: Metadata = JSON.parse(raw);

    metadata.LAST_INDEX += 1;
    metadata.TOTAL_REGISTRIES += 1;

    await this.writeJson(metadataPath, metadata);
  }

  async writeEntity<T>(basePath: string, entity: string, id: string, data: T): Promise<void> {
    const filePath = path.join(basePath, entity, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async readAll<T>(basePath: string, entity: string): Promise<T[]> {
    const folder = path.join(basePath, entity);
    await this.ensureEntityFolder(basePath, entity);
    const files = await fs.readdir(folder);
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== '_metadata.json');
    const results = await Promise.all(
      jsonFiles.map(f => fs.readFile(path.join(folder, f), 'utf-8').then(JSON.parse))
    );
    return results;
  }

  async readById<T>(basePath: string, entity: string, id: string): Promise<T | null> {
    const filePath = path.join(basePath, entity, `${id}.json`);
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    } 
  }

  async updateById(basePath: string, entity: string, id: string, data: any): Promise<void> {
    const filePath = path.join(basePath, entity, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  private async writeJson(filePath: string, data: unknown) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
}
