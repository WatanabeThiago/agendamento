import { customAlphabet } from 'nanoid';
import ICodeGeneratorProvider from '../models/ICodeGeneratorProvider';

class CodeGeneratorProvider implements ICodeGeneratorProvider {
  private nanoid: () => string;

  constructor() {
    this.nanoid = customAlphabet('0123456789', 6);
  }

  generate(): string {
    return this.nanoid();
  }
}

export default CodeGeneratorProvider;
