import path from 'path';
import { fileURLToPath } from 'url';
export function getCurrentPath() {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename);
    return __dirname;
}
