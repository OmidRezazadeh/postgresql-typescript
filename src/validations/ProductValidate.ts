import Joi from "joi";

const nameValidation = Joi.string().required().messages({
  "string.base": " نام محصول باید از نوع رشته باشد",
  "any.required": "نام محصول اجباریست",
});

const categoryIdValidation = Joi.number().integer().required().messages({
  "number.base": " مقدار دسته بندی باید از نوع عدد باشد",
  "number.integer": "مقدار دسته بندی باید یک عدد صحیح باشد.",
  "any.required": "مقدار دسته بندی الزامی است.",
});

const descriptionValidation = Joi.string().required().messages({
  "string.base": " توضیحات محصول باید از نوع رشته باشد",
  "any.required": " توضیحات محصول اجباریست",
});

const priceValidation = Joi.number().required().integer().messages({
  "number.base": " مقدار مبلغ بندی باید از نوع عدد باشد",
  "number.integer": "مقدار مبلغ بندی باید یک عدد صحیح باشد.",
  "any.required": "مقدار مبلغ بندی الزامی است.",
});

const imagesValidation = Joi.array().required().items(Joi.string()).messages({
  "array.base": "نوع نامعتبر، آرایه مورد انتظار است",
  "array.includes": "همه موارد باید رشته ای باشند",
  "string.base": "مورد باید یک رشته باشد",
  "any.required": "عکس برای محصول اجباریست",
});
const count= Joi.number().required().integer().messages({
  "number.base": " مقدار تعداد بندی باید از نوع عدد باشد",
  "number.integer": "مقدار تعداد بندی باید یک عدد صحیح باشد.",
  "any.required": "مقدار تعداد بندی الزامی است.",
})
const status =Joi.required().messages({
  "any.required": "وضعیت برای محصول اجباریست",
})
export const storeProductValidate = Joi.object({
  name: nameValidation,
  category_id: categoryIdValidation,
  description: descriptionValidation,
  price: priceValidation,
  images: imagesValidation
});



export const editProductValidate = Joi.object({
  name: nameValidation,
  category_id: categoryIdValidation,
  description: descriptionValidation,
  price: priceValidation,
  images: Joi.allow(null),
  status:status,
  count:count
}) 
