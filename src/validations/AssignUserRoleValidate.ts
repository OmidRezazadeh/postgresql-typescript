import Joi from 'joi';

export const userRoleValidate = Joi.object({
role_id: Joi.number().integer().required().messages({
"number.bass":"شناسه نقش باید یک عدد باشد",
"number.integer":"شناسه نقش باید یک عدد صحیح باشد. ",
"any.required":"شناسه نقش الزامی است.",
}),
user_id: Joi.number().integer().required().messages({
    'number.base': 'شناسه کاربری باید یک عدد باشد.',
    'number.integer': 'شناسه کاربری باید یک عدد صحیح باشد.',
    'any.required': 'شناسه کاربر الزامی است.'
  })
});