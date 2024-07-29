import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Productaction } from '../../Store/product';
import { Button } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.ProductList);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('https://traveling-website-810b9-default-rtdb.firebaseio.com/products.json');
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        
        const groupedProducts = {
          villas: [],
          apartments: [],
          houseboats: [],
          farmhouses: []
        };

        for (const category in data) {
          groupedProducts[category] = Object.keys(data[category]).map(key => ({
            id: key,
            ...data[category][key],
            category
          }));
        }

        dispatch(Productaction.setProductList(groupedProducts)); // Use the correct action
      } catch (error) {
        alert(error.message);
      }
    };
    fetchDetails();
  }, [dispatch]);

  const editButtonHandler = (product) => {
    dispatch(Productaction.setEditingProduct(product));
  };

  const deleteButtonHandler = async (id, category) => {
    try {
      const response = await fetch(`https://traveling-website-810b9-default-rtdb.firebaseio.com/products/${category}/${id}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
      dispatch(Productaction.deleteItem({ id, category }));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {Object.keys(productList).map(category => (
        <div key={category}>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <ul className="product-list">
            {productList[category].map((item) => (
              <div key={item.id} className="product-item">
                <div className="product-details">
                  <li>
                    <strong>Name:</strong> {item.Name}<br />
                    <strong>City:</strong> {item.City}<br />
                    <strong>Address:</strong> {item.Address}<br />
                    <strong>Price:</strong> {item.Price}<br />
                    <strong>AC:</strong> {item.AC}<br />
                    <strong>Non-AC:</strong> {item.NonAc}
                  </li>
                </div>
                <div className="product-actions">
                  <Button type='button' variant='dark' onClick={() => editButtonHandler(item)}>Edit Details</Button>
                  <Button type='button' variant='danger' onClick={() => deleteButtonHandler(item.id, item.category)}>Delete</Button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
