import Joi from "joi";
export const storeProductValidate = Joi.object({
  name: Joi.string().required().messages({
    "string.base": " نام محصول باید از نوع رشته باشد",
    "any.required": "نام محصول اجباریست",
  }),
  category_id: Joi.number().integer().required().messages({
    "number.base": " مقدار دسته بندی باید از نوع عدد باشد",
    "number.integer": "مقدار دسته بندی باید یک عدد صحیح باشد.",
    "any.required": "مقدار دسته بندی الزامی است.",
  }),
  description: Joi.string().required().messages({
    "string.base": " توضیحات محصول باید از نوع رشته باشد",
    "any.required": " توضیحات محصول اجباریست",
  }),
  images: Joi.array().required().items(Joi.string()).messages({
    "array.base": "نوع نامعتبر، آرایه مورد انتظار است",
    "array.includes": "همه موارد باید رشته ای باشند",
    "string.base": "مورد باید یک رشته باشد",
    "any.required": "عکس برای محصول اجباریست",
  }),
  price: Joi.number().required().integer().messages({
    "number.base": " مقدار مبلغ بندی باید از نوع عدد باشد",
    "number.integer": "مقدار مبلغ بندی باید یک عدد صحیح باشد.",
    "any.required": "مقدار مبلغ بندی الزامی است.",
  }),
});
