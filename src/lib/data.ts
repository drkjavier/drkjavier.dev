import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { join } from 'node:path';

const dataDir = join(process.cwd(), 'src', 'data');

export function loadYaml<T = any>(filename: string): T {
  const content = readFileSync(join(dataDir, filename), 'utf-8');
  return parse(content) as T;
}

export function loadAllData() {
  return {
    profile: loadYaml('profile.yaml'),
    skills: loadYaml('skills.yaml'),
    experience: loadYaml('experience.yaml'),
    projects: loadYaml('projects.yaml'),
    education: loadYaml('education.yaml'),
    translations: loadYaml('translations.yaml'),
  };
}
