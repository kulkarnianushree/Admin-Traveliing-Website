import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './ProductForm.css';
import { Productaction } from '../../Store/product';

const cities = ['Bengaluru', 'Mumbai', 'New Delhi', 'Pune'];

const ProductForm = () => {
  const [product, setProduct] = useState({
    Stays: '',
    Name: '',
    City: '',
    Address: '',
    Price: '',
    ImageUrls: [],
    AC: 0,
    NonAc: 0
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOtherCity, setIsOtherCity] = useState(false);

  const dispatch = useDispatch();
  const editingProduct = useSelector(state => state.product.editingProduct);

  useEffect(() => {
    if (editingProduct) {
      setProduct({
        ...editingProduct,
        AC: editingProduct.AC || 0,
        NonAc: editingProduct.NonAc || 0
      });
      setIsEdit(true);
    }
  }, [editingProduct]);

  const addOrUpdateItemHandler = async () => {
    try {
      const method = isEdit ? 'PATCH' : 'POST';
      const productType = product.Stays.toLowerCase();
      const url = isEdit
        ? `https://traveling-website-810b9-default-rtdb.firebaseio.com/products/${productType}/${product.id}.json`
        : `https://traveling-website-810b9-default-rtdb.firebaseio.com/products/${productType}.json`;

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      if (isEdit) {
        dispatch(Productaction.updateItem(product));
        setIsEdit(false);
      }

      alert('Successfully uploaded the data');
    } catch (error) {
      alert(error.message);
    }
  };

  const StaysChange = (event) => {
    setProduct({ ...product, Stays: event.target.value });
  };

  const NameChange = (event) => {
    setProduct({ ...product, Name: event.target.value });
  };

  const CityChange = (event) => {
    const value = event.target.value;
    if (value === 'Other') {
      setIsOtherCity(true);
      setProduct({ ...product, City: '' });
    } else {
      setIsOtherCity(false);
      setProduct({ ...product, City: value });
    }
  };

  const AddressChange = (event) => {
    setProduct({ ...product, Address: event.target.value });
  };

  const PriceChange = (event) => {
    setProduct({ ...product, Price: event.target.value });
  };

  const imageHandler = (event) => {
    const imageUrls = [...product.ImageUrls];
    imageUrls[parseInt(event.target.id.replace('image', '')) - 1] = event.target.value;
    setProduct({ ...product, ImageUrls: imageUrls });
  };

  const AcChange = (event) => {
    setProduct({ ...product, AC: parseInt(event.target.value) });
  };

  const NonAcChange = (event) => {
    setProduct({ ...product, NonAc: parseInt(event.target.value) });
  };

  return (
    <div className="product-form">
      <form>
        <div className="form-line">
          <div className="form-group">
            <label>Stays</label>
            <select name="Stays" onChange={StaysChange} value={product.Stays}>
              <option value='default'>Select one</option>
              <option value="Villas">Villas</option>
              <option value="Apartment">Apartment</option>
              <option value="HouseBoats">HouseBoats</option>
              <option value="FarmHouses">FarmHouses</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name="Name" onChange={NameChange} value={product.Name} />
          </div>
          <div className="form-group">
            <label htmlFor='city'>City</label>
            {!isOtherCity ? (
              <select name="City" onChange={CityChange} value={product.City}>
                <option value=''>Select a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
                <option value='Other'>Other</option>
              </select>
            ) : (
              <input type='text' id='city' name="City" onChange={(e) => setProduct({ ...product, City: e.target.value })} value={product.City} />
            )}
          </div>
        </div>
        <div className="form-line">
          <div className="form-group">
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' name="Address" onChange={AddressChange} value={product.Address} />
          </div>
          <div className="form-group">
            <label htmlFor='price'>Price</label>
            <input type='number' id='price' name="Price" onChange={PriceChange} value={product.Price} />
          </div>
          <div className="form-group">
            <label htmlFor='image'>Images</label>
            <input type='url' id='image1' onChange={imageHandler} />
            <input type='url' id='image2' onChange={imageHandler} />
            <input type='url' id='image3' onChange={imageHandler} />
          </div>
        </div>
        <div className="form-line">
          <div className="form-group">
            <label htmlFor='AC'>AC Rooms</label>
            <input type='number' id='AC' name="AC" onChange={AcChange} value={product.AC} />
          </div>
          <div className="form-group">
            <label htmlFor='NonAc'>Non-AC Rooms</label>
            <input type='number' id='NonAc' name="NonAc" onChange={NonAcChange} value={product.NonAc} />
          </div>
        </div>
        <div className="form-group">
          <Button onClick={addOrUpdateItemHandler}>{isEdit ? 'Update Item' : 'Add Item'}</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
