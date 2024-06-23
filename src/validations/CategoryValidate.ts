import Joi from 'joi';
export const storeValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'نام باید یک رشته باشد',
        'string.empty': 'نام نمی‌تواند خالی باشد',
        'any.required': 'نام یک فیلد اجباری است'
    }),
    
});