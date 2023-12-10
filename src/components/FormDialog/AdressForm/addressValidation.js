const addressValidation = (formData) => {
    const { country, city, postalCode, street, home, apartament } = formData;
    return (
        country && city && postalCode && street && home && apartament
    );
};

export default addressValidation;