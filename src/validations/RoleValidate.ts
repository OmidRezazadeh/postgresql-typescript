import Joi from 'joi';

export const roleValidate = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'نقش باید از نوع رشته باشد',
    'any.required': 'عنوان اجباریست',
  }),
});