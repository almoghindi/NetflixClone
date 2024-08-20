import s3 from '../config/aws-configuretions';
import { Readable } from 'stream';

class S3Service {
  streamVideo(bucketName: string, key: string): Readable {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    return s3.getObject(params).createReadStream();
  }
}

export default new S3Service();
