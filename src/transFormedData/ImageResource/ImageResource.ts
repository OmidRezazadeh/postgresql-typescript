export const ImageResource = (image: any) => {
  return {
    id: image.id, // Include the role's id
    name: image.url, // Include the role's name
    created_at: image.created_at,
    updated_at: image.created_at,
    
    };
}