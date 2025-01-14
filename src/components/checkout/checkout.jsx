import styles from './checkout.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Checkout = () => {
    const location = useLocation();
	const navigate = useNavigate();
    const initialCartItems = location.state?.cartItems.map(item => ({
        ...item, 
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
    })) || [];
    const [cartItems, setCartItems] = useState(initialCartItems)

    //fixed shipping fee
    const shippingFee = 2000;

    //update quantity and recalculate price
    const updateQuantity = (index, operation) => {
        const updatedCartItems = [...cartItems];
        if(operation === 'increase') {
            updatedCartItems[index].quantity += 1;
        } else if(operation === 'decrease' && updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
        }
        setCartItems(updatedCartItems);
    }

    //calculate total
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || 0;
            const quantity = item.quantity || 0;
    
            return total + price * quantity;
        }, 0)
    } 
    const calculateGrandTotal = () => {const subtotal = calculateSubtotal(); return subtotal  + shippingFee;}

    const handleCheckout = () => {
        alert('Checkout complete!');
        //redirect to payment page
        navigate('/payment')
    }

  return (
    <div className={styles.checkout}>
        <div className={styles.header}>
            <button onClick={() => navigate('/cart')} className={styles.backBtn}>&larr;</button>
            <h1>Order Summary</h1>
        </div>
        <div className={styles.cartItems}>
            {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                    <img src={item.image} alt={item.name} id={styles.itemImage} />
                    <div className={styles.itemDetails}>
                        <div className={styles.priceName}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price * item.quantity.toLocaleString()/1000}k</p>
                        </div>
                        <div className={styles.quantityControl}>
                            <button onClick={() => updateQuantity(index, 'decrease')}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, 'increase')}>+</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.summary}>
            <div className={styles.total}>
                <p>Subtotal:</p>
                <p> ${calculateSubtotal().toLocaleString()}</p>
            </div>
            <div className={styles.total}>
                <p>Shipping Fee: </p>
                <p>${shippingFee.toLocaleString()}</p>
            </div>
            <div className={styles.grandTotal}>
                <strong>Grand Total:</strong>
                <strong> ${calculateGrandTotal().toLocaleString()}</strong>
            </div>
            <button onClick={handleCheckout} id={styles.checkoutBtn}>Checkout</button>
        </div>
    </div>
  )
}

export default Checkout