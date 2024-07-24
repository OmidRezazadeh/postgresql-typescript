import User from '../../models/user';
import Image from "../../models/image";

export const ProductResource = (product: any) => {

    const data = {
        id: product.id,
        name: product.name,
        description: product.description,
        count: product.count,
        status: product.status,
        created_at: product.created_at,

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
    };
    return data;
}
