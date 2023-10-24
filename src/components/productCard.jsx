import React from "react";
import "./productCard.css"
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'

function ProductCard( product ) {
    return (
        <div className="card">
            <Link key={product.id} className="link-no-color-change" to={`/productview/${product.id}`}>
                <Image className="card-img-top" src="https://picsum.photos/300/200" alt="Card image cap" thumbnail/>
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.price}€</p>
                    </div>
            </Link>
        </div>
    )
}

export default ProductCard;