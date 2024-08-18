import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Booking.css';
import { Button } from 'react-bootstrap';
import { BookActions } from '../../Store/book'; 

const Booking = () => {
  const BookDetails = useSelector(state => state.book.Book); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await fetch('https://travelling-user-default-rtdb.firebaseio.com/Book.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        dispatch(BookActions.setBook(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookList();
  }, [dispatch]);

  const ConfirmButtonHandler = async (bookingId) => {
    try {
      const updatedBooking = {
        ...BookDetails[bookingId],
        Status: 'Confirmed',
      };

      const response = await fetch(`https://travelling-user-default-rtdb.firebaseio.com/Book/${bookingId}.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedBooking),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm booking');
      }

      dispatch(BookActions.confirmBooking({ bookingId, status: 'Confirmed' }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="booking-container">
      <h1>Booking List</h1>
      {Object.keys(BookDetails).length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul className="booking-list">
          {Object.entries(BookDetails).map(([key, booking]) => (
            <li key={key} className="booking-item">
              <div className="booking-details">
                <h2>Hotel: {booking?.Hotel?.Name}</h2>
                <div className="image-container">
                  {Array.isArray(booking?.Hotel?.ImageUrls) && booking.Hotel.ImageUrls.slice(0, 2).map((url, imageIndex) => (
                    <img key={imageIndex} src={url} alt='' />
                  ))}
                </div>
                <div className="details-container">
                  <p><strong>Address:</strong> {booking?.Hotel?.Address}</p>
                  <p><strong>City:</strong> {booking?.Hotel?.City}</p>
                  <p><strong>AC Price:</strong> {booking?.Hotel?.AC}</p>
                  <p><strong>Non-AC Price:</strong> {booking?.Hotel?.NonAc}</p>
                  <p><strong>Price:</strong> {booking?.Hotel?.Price}</p>
                  <p><strong>Stays:</strong> {booking?.Hotel?.Stays}</p>
                  <p><strong>People:</strong> {booking?.People}</p>
                  <p><strong>Booking Address:</strong> {booking?.Address}</p>
                  <p><strong>Status:</strong> {booking?.Status}</p>
                  <p><strong>Entry Date:</strong> {booking?.Entry}</p>
                  <p><strong>Exit Date:</strong> {booking?.Exit}</p>
                </div>
              </div>
              <Button 
                type='button' 
                onClick={() => ConfirmButtonHandler(key)}
                variant='success'>
                Confirm
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Booking;
