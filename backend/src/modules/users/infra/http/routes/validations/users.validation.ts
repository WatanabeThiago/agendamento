import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string(),
    profile_photo: Joi.string(),
    password: Joi.string(),
  },
});

export const auth = celebrate({
  [Segments.BODY]: {
    phone: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
  },
});

export const id = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const update = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});
