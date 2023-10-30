const isValid = (formData) => {
    const { category_id, title, price, weight, stock, color, volume, brand } = formData;
    return (
        category_id && title && price && weight && stock && color && volume && brand
    );
};

export default isValid;