import Joi from "joi";
export const editValidate = Joi.object({
  bio: Joi.string().allow(null).messages({
    "string.base": "بیو باید از نوع رشته باشد",
  }),
  image: Joi.string().messages({
    "string.base": "عکس باید از نوع رشته باشد",
  }),
});

export const editImage = Joi.object({
  imageName: Joi.string().required().messages({
    "string.base": "عکس باید از نوع رشته باشد",
    "any.required": "مقدار اجباری است",
  }),
});
