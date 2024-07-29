import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from 'react-bootstrap';
import './ProductForm.css';
import { Productaction } from '../../Store/product';

const ProductForm = () => {
  const [product, setProduct] = useState({
    Stays: 'Villas', // Default value for Stays
    Name: '',
    City: '',
    Address: '',
    Price: '',
    ImageUrls: [],
    AC: 0,
    NonAc: 0
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fileChangeHandler = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const addOrUpdateItemHandler = async () => {
    try {
      let imageUrls = product.ImageUrls || [];
      if (selectedFiles.length > 0) {
        const storage = getStorage();
        const uploadPromises = selectedFiles.map((file) => {
          const storageRef = ref(storage, `products/${file.name}`);
          return uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef));
        });

        imageUrls = await Promise.all(uploadPromises);
      }

      const updatedProduct = {
        ...product,
        ImageUrls: imageUrls,
      };

      const method = isEdit ? 'PATCH' : 'POST';
      const productType = product.Stays.toLowerCase();
      const url = isEdit
        ? `https://traveling-website-810b9-default-rtdb.firebaseio.com/products/${productType}/${product.id}.json`
        : `https://traveling-website-810b9-default-rtdb.firebaseio.com/products/${productType}.json`;

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(updatedProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      if (isEdit) {
        dispatch(Productaction.updateItem(updatedProduct));
        setIsEdit(false);
      }

      alert('Successfully uploaded the data');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="product-form">
      <form>
        <div className="form-line">
          <div className="form-group">
            <label>Stays</label>
            <select name="Stays" onChange={handleChange} value={product.Stays}>
              <option value="Villas">Villas</option>
              <option value="Apartment">Apartment</option>
              <option value="HouseBoats">HouseBoats</option>
              <option value="FarmHouses">FarmHouses</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name="Name" onChange={handleChange} value={product.Name} />
          </div>
          <div className="form-group">
            <label htmlFor='city'>City</label>
            <select name="City" onChange={handleChange} value={product.City}>
              <option>Bengaluru</option>
              <option>Mumbai</option>
              <option>New Delhi</option>
              <option>Pune</option>
            </select>
          </div>
        </div>
        <div className="form-line">
          <div className="form-group">
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' name="Address" onChange={handleChange} value={product.Address} />
          </div>
          <div className="form-group">
            <label htmlFor='price'>Price</label>
            <input type='number' id='price' name="Price" onChange={handleChange} value={product.Price} />
          </div>
          <div className="form-group">
            <label htmlFor='image'>Images</label>
            <input type='file' id='image' multiple onChange={fileChangeHandler} />
          </div>
        </div>
        <div className="form-line">
          <div className="form-group">
            <label htmlFor='AC'>AC Rooms</label>
            <input type='number' id='AC' name="AC" onChange={handleChange} value={product.AC} />
          </div>
          <div className="form-group">
            <label htmlFor='NonAc'>Non-AC Rooms</label>
            <input type='number' id='NonAc' name="NonAc" onChange={handleChange} value={product.NonAc} />
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
