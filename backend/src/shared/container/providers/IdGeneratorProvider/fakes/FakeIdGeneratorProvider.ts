import { v1 } from 'uuid';
import crypto from 'crypto';
import IIdGeneratorProvider from '../models/IIdGeneratorProvider';

class FakeIdGeneratorProvider implements IIdGeneratorProvider {
  generate(): string {
    return crypto.randomUUID();
  }
}

export default FakeIdGeneratorProvider;
