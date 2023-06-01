import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    profile_photo: Joi.string(),
  },
});
