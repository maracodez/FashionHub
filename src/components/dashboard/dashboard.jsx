//import React from 'react'
import styles from './dashboard.module.css'
import locationicon from '../../assets/Group 16.png'
import ellipse from '../../assets/Ellipse 1.png'
//import frame from '../../assets/Frame 2.png'
import carticon from '../../assets/Group 8.png'
import rectangle81 from '../../assets/Rectangle 8 (1).png'
import rectangle8 from '../../assets/Rectangle 8.png'
import rectangle from '../../assets/Rectangle 6.png'
import rectangl from '../../assets/Rectangle 9.png'
import rectang from '../../assets/Rectangle 5.png'
import rectangle10 from '../../assets/Rectangle 10.png'
import group7 from '../../assets/Group 7.png'
import group9 from '../../assets/Group 9.png'
import group10 from '../../assets/Group 10.png'
import juki from '../../assets/juki.jpg'
import needle from '../../assets/needle.jpg'
import twolion from '../../assets/twolion.jpg'
import coat from '../../assets/coat.jpeg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'; 



const Dashboard = () => {
	const navigate = useNavigate()
	const [cart, setCart] = useState([]);
	


 const handlepay  = () => {
	navigate("/payment")
 }

//  const handleSetting  = () => {
// 	navigate("/change")
//  }

 const products = [
	{id: 1, name: 'Emel Machine', price:36000, image: rectang},
	{id: 2, name: 'Butterfly Machine', price:150000, image: rectangl},
	{id: 3, name: 'Juki Machine', price:58000, image: rectangle},
	{id: 4, name: 'Butterfly Machine', price:120000, image: rectangl},
	{id: 5, name: 'Singer Machine', price:49000, image: rectangle10},
	{id: 6, name: 'Butterfly Machine', price:20000, image: rectangle},
	{id: 7, name: 'Machine Needle', price:2000, image: needle},
	{id: 8, name: 'Juki Machine', price:60000, image: juki},
	{id: 9, name: 'TwoLion Machine', price:80000, image: twolion},
 ];


 const [location, setLocation] = useState(null);
 const [iconset, setIconset] = useState(null);
 const [error, setError] = useState(null);
 //for count down
 const [cartCount, setCartCount] = useState(0);
 const [cartItems, setCartItems] = useState([]);
 const [searchQuery, setSearchQuery] =  useState('');
 const [filteredProducts, setFilteredProducts] = useState(products)

 //function to handlee location retrieval
 const handleLocation = () => {
	if (location || error) {
		//if location or error is displayed, clear them to "toggle off"
		setLocation(null)
		setError(null)
	}  else {
		if (navigator.getlocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setLocation(`Latitude: ${latitude}, Longitude: ${longitude} `);
				//clear previous error
				setError(null)
			}, () => {
				setError("unable to retrieve your locaation");
				//clear any previous location
				setLocation(null)
			});
		} else {
			setError("Geolocaation is not supported by this browser")
			
		}
	}
 };

 const handleSearch = (e) => {
	const query = e.target.value.toLowerCase();
	setSearchQuery(query);
	const filtererd = products.filter((product) => product.name.toLowerCase().includes(query)
	);
	setFilteredProducts(filtererd)
 }
 
 

 const addToCart = (product) => {
	setCartCount(cartCount + 1)
	setCartItems([...cartItems, product])
	const existingItem = cart.find((item) => item.id === product.id);
	if (existingItem) {
		setCart(
			cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
		);
	}  	else {
		setCart([...cart, { ...product, quantity: 1}]);
	 }
	toast.success(`${product.name} added to cart!`);
 };

 const handleCartNavigation = () => {
	navigate('/cart',{ state: { cartItems}})
 }

 //handle settings

 const handleSetting = () => {
		if (iconset) {
			setIconset(null)
		} else {
			setIconset('<div> </div>')
		}
 }

  return (
    <div className={styles.dashboard}>
      <div className={styles.nav}>
			<div onClick={handleLocation || handleCartNavigation} className={styles.location}>
				<img src={locationicon} alt="" />
			</div>
			<div className={styles.displayLocation}>
				{location && <p>Your location:{location}</p>}
				{error && <p style={{ color: 'red'}}>{error}</p>}
			</div>
			
			<div className={styles.input}>
				<svg id="search-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
				<input
					type='text'
					id={styles.search}
					value={searchQuery}
					onChange={handleSearch}
					placeholder='Search for products'
				/>
			</div>
				
			<div className={styles.ellipse}>
				<img src={ellipse} alt="" />
			</div>		
      </div>
	  <div className={styles.categ}>
			<h5>Top categories</h5>
			<p>All</p>
	  </div>
	  <div className={styles.frameContainer}>
			<div className={styles.frame}>
				<img src={rectangle81} alt="" />
				<img src={rectangle8} alt="" />
				<img src={juki} alt="" />
				<img src={rectangle8} alt="" />
				<img src={needle} alt="" />
				<img src={twolion} alt="" />
				<img src={coat} alt="" />
			</div>
		</div>
	  <div className={styles.cartopt}>
			<select id="">
				<option>stores</option>
				<option>Emel</option>
				<option>Two lion</option>
				<option>Butterfly</option>
				<option>Juki</option>
				<option >Delivery</option>
			</select>
			<p className={styles.cartico} onClick={handleCartNavigation} >
				<img src={carticon} alt="" id={styles.icon}/>
				<div className={styles.count}>
					{cartCount > 0 && <span>{cartCount}</span> }
				</div>
			</p>
	  </div>
	  <div className={styles.products}>
			{filteredProducts.map((product) => (
				<div key={product.id} className={styles.product}>
					<div className={styles.product_img}>
						<img src={product.image} alt={product.name} />
					</div>
					<div className={styles.product_price}>
						<p>${product.price / 1000}k</p>
						<button onClick={() => addToCart(product)} id={styles.plus_btn}>+</button>
					</div>
				</div>
			))}
	  </div>
	  <div className={styles.notify}>
			<p id={styles.partner}>Looking to partner with us?<a href="#">Click here</a></p>
			<p>Or</p>
			<p id={styles.rider}>Are you a professional rider? <a href="#">Click here</a></p>
	  </div>
	  <footer>
			<img src={group10} alt="" />
			<div className={styles.cartcount}>
				<img src={carticon} alt="" onClick={handleCartNavigation}/>
				<div className={styles.counts}>
					{cartCount > 0 && <span>{cartCount}</span> }
				</div>
			</div>
			<img src={group7} alt="" onClick={handlepay}/>
			<img src={group9} alt="" onClick={handleSetting}/>
	  </footer>
	  <div className={styles.settings}>
			{iconset && <p>Reset Password</p>}
			{iconset && <p>Log out</p>}
	  </div>
    </div>
  )
}

export default Dashboard
