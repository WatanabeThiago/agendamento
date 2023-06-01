import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '../../../services/CreateCompanyService';

export default class CompaniesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createCompanyService = container.resolve(CreateCompanyService);

    let filename: string | undefined;
    if (req.file) {
      filename = req.file.filename;
    }

    const { name, phone } = req.body;

    const user = await createCompanyService.execute({
      name,
      phone,
      profile_photo: filename,
      user_id: req.user.id,
    });

    return res.status(201).json(classToClass(user));
  }
}
