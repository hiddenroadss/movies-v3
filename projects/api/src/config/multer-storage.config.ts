import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export class MulterStorageConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/posters/');
        },
        filename(req, file, cb) {
          // Customize the filename here (e.g., implement a UUID for the file)
          const randomId = uuidv4();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${randomId}.${fileExtension}`;
          cb(null, fileName);
        },
      }),
    };
  }
}
