import React from 'react'
import image from "../../../assets/produtos/caixa-d-agua-1.jpg"
import DataProducts from "../../../data/produtcs.json";
import './Products.css' 


const Products = ({selectProduct}) => {
  console.log(selectProduct)
  return (
    <div className="container-product">
      <div className='image-product'>
        <div className="image"><img src={image} alt="" /></div>
        <h4>{selectProduct}</h4>
        <p>quantidade</p>
        <p>Vl unitario</p>
        <p>desconto</p>
      </div>
    </div>
  )
}

export default Products