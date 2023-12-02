const isValid = (formData) => {
    const { categoryId, title, price, weight, stock, color, volume, brand } = formData;
    return (
        categoryId && title && price && weight && stock && color && volume && brand
    );
};

export default isValid;