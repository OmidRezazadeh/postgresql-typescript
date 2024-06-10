import Joi from 'joi';
export const editValidate = Joi.object({
    bio: Joi.string().allow(null).messages({
        'string.base': 'بیو باید از نوع رشته باشد',
    }),
    
});