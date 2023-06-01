import { container } from 'tsyringe';

import ICodeGeneratorProvider from './models/ICodeGeneratorProvider';
import CodeGeneratorProvider from './implementations/CodeGeneratorProvider';

container.registerSingleton<ICodeGeneratorProvider>(
  'CodeGeneratorProvider',
  CodeGeneratorProvider,
);
