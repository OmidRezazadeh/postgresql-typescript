
import Image from "../../models/image";
export const ProductCollection = (products: any) => {
  const transformedData = products.map((product: any) => {
    return{
        id:product.id,
        name:product.name,
        description:product.description,
        status:product.status,
        count:product.count,
        user:{
            id: product.user.id,
            name: product.user.name,
            email: product.user.email,
        },
        image:product.images ? product.images.map((image: Image) => ({
            id: image.id,
            name: image.url,
            imageable_id: image.imageable_id,
            imageable_type: image.imageable_type,
        })) : []
    }
  });

  return {
    roles: transformedData, // The transformed list of roles
    meta: {
      total_pages: products?.totalPages, // Total number of pages
      current_page: products?.currentPage, // Current page number
      total: products?.totalCount, // Total number of roles
      per_page: products?.perPage, // Number of items per page
      next_page: products?.nextPage, // Next page number, if any
    }
  };
};
