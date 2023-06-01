import ICodeGeneratorProvider from '../models/ICodeGeneratorProvider';

class FakeCodeGeneratorProvider implements ICodeGeneratorProvider {
  generate(): string {
    return Math.random()
      .toString(6)
      .replace(/[^0-9]+/g, '');
  }
}

export default FakeCodeGeneratorProvider;
