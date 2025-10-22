import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Mock Data ---
const initialProperties = [
  {
    id: 1,
    type: 'house',
    address: 'ECR, Chennai, Tamil Nadu',
    price: '35,000,000', // 3.5 Crore INR
    beds: 4,
    baths: 5,
    sqft: 3_200,
    imageUrls: [
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Stunning beachfront villa on East Coast Road with panoramic views of the Bay of Bengal. Features a modern design, spacious living areas, and a private path to the beach.'
  },
  {
    id: 2,
    type: 'house',
    address: 'R.S. Puram, Coimbatore, Tamil Nadu',
    price: '28,000,000', // 2.8 Crore INR
    beds: 5,
    baths: 6,
    sqft: 4_800,
    imageUrls: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Luxurious independent house in the heart of Coimbatore. This magnificent home boasts a grand entryway, a gourmet kitchen, a home theater, and a beautiful garden space.'
  },
  {
    id: 3,
    type: 'house',
    address: 'Kodaikanal, Tamil Nadu',
    price: '19,500,000', // 1.95 Crore INR
    beds: 3,
    baths: 4,
    sqft: 2_900,
    imageUrls: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Charming mountain retreat with breathtaking views of the surrounding hills. Features rustic yet elegant interiors, a stone fireplace, and serene natural surroundings.'
  },
  {
    id: 5,
    type: 'land',
    address: 'OMR, Chennai, Tamil Nadu',
    price: '9,500,000', // 95 Lakhs INR
    beds: 0,
    baths: 0,
    sqft: 2400, // Plot size
    imageUrls: [
      'https://images.pexels.com/photos/1029615/pexels-photo-1029615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'An empty site on OMR, the IT corridor of Chennai. This 2400 sqft plot is a perfect empty place to build your dream home. Located in a gated community with all amenities.'
  },
  {
    id: 6,
    type: 'farm',
    address: 'Pollachi, Coimbatore, Tamil Nadu',
    price: '42,500,000', // 4.25 Crore INR
    beds: 3,
    baths: 3,
    sqft: 435600, // 10 acres
    imageUrls: [
      'https://images.pexels.com/photos/247597/pexels-photo-247597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/161852/farm-barn-meadow-countryside-161852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Expansive coconut farm in the scenic outskirts of Pollachi. Includes a charming farmhouse, a large barn, and acres of fertile land with excellent water supply.'
  },
  {
    id: 7,
    type: 'land',
    address: 'Saravanampatti, Coimbatore, Tamil Nadu',
    price: '7,500,000', // 75 Lakhs INR
    beds: 0,
    baths: 0,
    sqft: 1800, // Plot size
    imageUrls: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'An empty site ready for construction in a rapidly developing residential area of Saravanampatti. This is a fantastic place to build your home, close to tech parks and educational institutions.'
  },
   {
    id: 8,
    type: 'farm',
    address: 'Near Madurai, Tamil Nadu',
    price: '21,000,000', // 2.1 Crore INR
    beds: 2,
    baths: 2,
    sqft: 217800, // 5 acres
    imageUrls: [
      'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/568021/pexels-photo-568021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Picturesque farm land near Madurai with a traditional farmhouse. Surrounded by paddy fields and pasture, perfect for integrated organic farming.'
  },
];


// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#0D2F4B',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#4A5568',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  userControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  roleSelector: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
  },
  addPropertyButton: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#F97316',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  hero: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#F1F5F9',
  },
  heroTitle: {
    fontSize: '2.5rem',
    color: '#0D2F4B',
    marginBottom: '1rem',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
  },
  searchInput: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    width: '400px',
    maxWidth: '80%',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
  },
  searchButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#F97316',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  listingsContainer: {
    padding: '2rem',
  },
  listingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
  },
  propertyImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  propertyInfo: {
    padding: '1.5rem',
  },
  propertyPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1E293B',
  },
  propertyAddress: {
    fontSize: '1rem',
    color: '#4A5568',
    margin: '0.5rem 0 1rem',
  },
  propertyDetails: {
    display: 'flex',
    gap: '1rem',
    color: '#4A5568',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '1rem',
    marginTop: '1rem',
  },
  footer: {
      backgroundColor: '#0D2F4B',
      color: '#ffffff',
      textAlign: 'center',
      padding: '1.5rem',
      marginTop: 'auto',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    overflowY: 'auto',
    padding: '2rem 0',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  detailModalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
  },
  modalTitle: {
      margin: 0,
      fontSize: '1.5rem',
      color: '#0D2F4B',
  },
  closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#4A5568',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formInput: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
  },
  formButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#F97316',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  errorMessage: {
    color: '#E53E3E',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '1rem',
  },
  galleryContainer: {
    marginBottom: '1.5rem',
  },
  mainImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  thumbnailContainer: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border-color 0.2s',
  },
  activeThumbnail: {
    borderColor: '#F97316',
  },
  detailSection: {
      marginBottom: '1rem',
  },
  detailTitle: {
      fontSize: '1.2rem',
      color: '#0D2F4B',
      borderBottom: '2px solid #F1F5F9',
      paddingBottom: '0.5rem',
      marginBottom: '1rem',
  },
  mapContainer: {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '1rem',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  filterButton: {
    padding: '0.6rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#4A5568',
    backgroundColor: '#fff',
    border: '1px solid #CBD5E1',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  activeFilterButton: {
    color: '#ffffff',
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '3rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  loginButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '0.5rem',
    width: '250px',
  },
  homePageContainer: {
    padding: '2rem 4rem',
    backgroundColor: '#fff',
  },
  homeSection: {
    marginBottom: '3rem',
  },
  homeSectionTitle: {
    fontSize: '2.2rem',
    color: '#0D2F4B',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  homeText: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#4A5568',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  serviceCard: {
    padding: '1.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    textAlign: 'center',
  },
  contactInfo: {
    listStyle: 'none',
    padding: 0,
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#4A5568',
  }
};


// --- Components ---

const LoginPage = ({ onSelectRole }) => (
    <div style={styles.loginPage}>
        <div style={styles.loginContainer}>
            <h1 style={{...styles.logo, fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Akil Neliam</h1>
            <p style={{...styles.homeText, fontSize: '1.2rem', marginBottom: '2rem'}}>Your trusted partner in real estate.</p>
            <h2 style={{color: '#0D2F4B', fontWeight: 500}}>I am a...</h2>
            <div>
                <button 
                    onClick={() => onSelectRole('customer')} 
                    style={{...styles.loginButton, backgroundColor: '#F97316', color: '#fff'}}
                >
                    Customer (Looking to Buy)
                </button>
                <button 
                    onClick={() => onSelectRole('seller')} 
                    style={{...styles.loginButton, backgroundColor: '#0D2F4B', color: '#fff'}}
                >
                    Seller (Looking to List)
                </button>
            </div>
        </div>
    </div>
);

const HomePage = () => (
    <div style={styles.homePageContainer}>
        <section style={styles.homeSection}>
            <h2 style={styles.homeSectionTitle}>About Akil Neliam</h2>
            <p style={styles.homeText}>
                Akil Neliam is a premier real estate consultancy dedicated to simplifying your property journey. Whether you are buying your dream home, selling a property, or investing in land, we provide expert guidance and personalized service every step of the way. Our foundation is built on trust, transparency, and an unwavering commitment to our clients' success.
            </p>
        </section>

        <section style={styles.homeSection}>
            <h2 style={styles.homeSectionTitle}>Our Services</h2>
            <div style={styles.servicesGrid}>
                <div style={styles.serviceCard}>
                    <h3 style={{color: '#0D2F4B'}}>Property Sales & Purchase</h3>
                    <p style={{color: '#4A5568'}}>Expert assistance in finding and securing the perfect property that meets your needs and budget.</p>
                </div>
                <div style={styles.serviceCard}>
                    <h3 style={{color: '#0D2F4B'}}>Legal & Documentation</h3>
                    <p style={{color: '#4A5568'}}>Comprehensive support with all legal paperwork, ensuring a smooth and secure transaction.</p>
                </div>
                 <div style={styles.serviceCard}>
                    <h3 style={{color: '#0D2F4B'}}>Real Estate Investment</h3>
                    <p style={{color: '#4A5568'}}>Strategic advice for investors looking to capitalize on the dynamic real estate market.</p>
                </div>
            </div>
        </section>
        
        <section style={styles.homeSection}>
            <h2 style={styles.homeSectionTitle}>Meet the Founder</h2>
             <div style={{textAlign: 'center'}}>
                <h3 style={{fontSize: '1.8rem', color: '#0D2F4B', margin: 0}}>Kannappan</h3>
                <p style={{fontSize: '1.2rem', color: '#F97316', marginTop: '0.25rem', fontWeight: 'bold'}}>Founder & Senior Document Writer</p>
                <p style={styles.homeText}>
                   With decades of experience in the real estate sector, Kannappan is a master document writer known for his meticulous attention to detail and deep understanding of property law. His expertise ensures that every transaction is handled with the utmost professionalism and legal precision, safeguarding your interests at all times.
                </p>
            </div>
        </section>

        <section style={styles.homeSection}>
            <h2 style={styles.homeSectionTitle}>Contact Us</h2>
            <div style={styles.homeText}>
                <p>Ready to start your property journey? Get in touch with us today.</p>
                <ul style={styles.contactInfo}>
                    <li style={{marginBottom: '0.5rem'}}><strong>Office Location:</strong> 123 Real Estate Avenue, T. Nagar, Chennai, Tamil Nadu</li>
                    <li style={{marginBottom: '0.5rem'}}><strong>Phone:</strong> +91 98765 43210</li>
                    <li><strong>Email:</strong> contact@akilneliam.com</li>
                </ul>
            </div>
        </section>
    </div>
);

const Header = ({ userRole, onRoleChange, onAddPropertyClick, onNavigate, onRentClick, onSellClick }) => (
  <header style={styles.header}>
    <div style={styles.logo}>Akil Neliam</div>
    <nav style={styles.nav}>
      <button onClick={() => onNavigate('home')} style={styles.navLink}>Home</button>
      <button onClick={() => onNavigate('properties')} style={styles.navLink}>Properties</button>
      <button onClick={onRentClick} style={styles.navLink}>Rent</button>
      <button onClick={onSellClick} style={styles.navLink}>Sell</button>
      <div style={styles.userControls}>
        <select value={userRole} onChange={(e) => onRoleChange(e.target.value)} style={styles.roleSelector} aria-label="Select user role">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        {userRole === 'admin' && (
          <button onClick={onAddPropertyClick} style={styles.addPropertyButton}>Add Property</button>
        )}
      </div>
    </nav>
  </header>
);

const SearchSection = ({ query, onQueryChange, onSearch }) => (
    <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Dream Place</h1>
        <p style={{color: '#4A5568'}}>Search for properties by address, city, or pincode.</p>
        <div style={styles.searchContainer}>
            <input
                type="text"
                placeholder="Enter a locality or city..."
                style={styles.searchInput}
                aria-label="Search for a property"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
            />
            <button style={styles.searchButton} aria-label="Submit search" onClick={onSearch}>Search</button>
        </div>
    </section>
);


const PropertyCard = ({ property, onViewDetails }) => (
  <div 
    style={styles.propertyCard} 
    onClick={() => onViewDetails(property)}
    onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
    }} 
    onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }}
  >
    <img src={property.imageUrls[0]} alt={`View of ${property.address}`} style={styles.propertyImage} />
    <div style={styles.propertyInfo}>
      <div style={styles.propertyPrice}>₹{parseInt(property.price.replace(/,/g, ''), 10).toLocaleString('en-IN')}</div>
      <p style={styles.propertyAddress}>{property.address}</p>
      <div style={styles.propertyDetails}>
        {property.type !== 'land' && property.type !== 'farm' && (
            <>
                <span><strong>{property.beds > 0 ? property.beds : '-'}</strong> {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                <span><strong>{property.baths > 0 ? property.baths : '-'}</strong> {property.baths === 1 ? 'Bath' : 'Baths'}</span>
            </>
        )}
        <span><strong>{property.sqft.toLocaleString('en-IN')}</strong> sqft</span>
      </div>
    </div>
  </div>
);

const FilterBar = ({ activeFilter, onFilterChange }) => {
    const filters = ['all', 'house', 'land', 'farm'];
    return (
        <div style={styles.filterContainer}>
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    style={{
                        ...styles.filterButton,
                        ...(activeFilter === filter ? styles.activeFilterButton : {})
                    }}
                    aria-pressed={activeFilter === filter}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
    );
};

// Fix: Define prop types for PropertyListings and correctly type the forwarded ref.
interface Property {
    id: number;
    type: string;
    address: string;
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrls: string[];
    description: string;
}

interface PropertyListingsProps {
    properties: Property[];
    onViewDetails: (property: Property) => void;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const PropertyListings = React.forwardRef<HTMLElement, PropertyListingsProps>(({ properties, onViewDetails, activeFilter, onFilterChange }, ref) => (
    <main style={styles.listingsContainer} ref={ref}>
        <h2 style={{ fontSize: '2rem', color: '#0D2F4B', marginBottom: '1rem', textAlign: 'center' }}>Featured Listings</h2>
        <FilterBar activeFilter={activeFilter} onFilterChange={onFilterChange} />
        {properties.length > 0 ? (
            <div style={styles.listingsGrid}>
                {properties.map(prop => <PropertyCard key={prop.id} property={prop} onViewDetails={onViewDetails} />)}
            </div>
        ) : (
            <p style={{textAlign: 'center', color: '#4A5568', fontSize: '1.1rem', marginTop: '2rem'}}>
                No properties found matching your criteria. Please try a different search or filter.
            </p>
        )}
    </main>
));

const Footer = () => (
    <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Akil Neliam. All rights reserved.</p>
    </footer>
);

const AddPropertyModal = ({ isOpen, onClose, onAddProperty }) => {
    const [formData, setFormData] = useState({
        address: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        imageUrl: '',
        type: 'house',
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProperty = {
            ...formData,
            price: formData.price.replace(/,/g, ''),
            beds: formData.type === 'house' ? (parseInt(formData.beds, 10) || 0) : 0,
            baths: formData.type === 'house' ? (parseInt(formData.baths, 10) || 0) : 0,
            sqft: parseInt(formData.sqft, 10),
            imageUrls: [formData.imageUrl, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
            description: 'A newly added property.'
        };
        onAddProperty(newProperty);
        onClose();
    };

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Add New Property</h2>
                    <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">&times;</button>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={styles.formInput} required />
                    <select name="type" value={formData.type} onChange={handleChange} style={styles.formInput}>
                        <option value="house">House</option>
                        <option value="land">Land</option>
                        <option value="farm">Farm</option>
                    </select>
                    <input type="number" name="price" placeholder="Price (INR)" value={formData.price} onChange={handleChange} style={styles.formInput} required />
                    {formData.type === 'house' && (
                        <>
                            <input type="number" name="beds" placeholder="Beds" value={formData.beds} onChange={handleChange} style={styles.formInput} />
                            <input type="number" name="baths" placeholder="Baths" value={formData.baths} onChange={handleChange} style={styles.formInput} />
                        </>
                    )}
                    <input type="number" name="sqft" placeholder="Square Feet" value={formData.sqft} onChange={handleChange} style={styles.formInput} required />
                    <input type="url" name="imageUrl" placeholder="Featured Image URL" value={formData.imageUrl} onChange={handleChange} style={styles.formInput} required />
                    <button type="submit" style={styles.formButton}>Add Property</button>
                </form>
            </div>
        </div>
    );
};

const PropertyDetailModal = ({ property, onClose }: { property: Property | null, onClose: () => void }) => {
    if (!property) return null;

    const [mainImage, setMainImage] = useState(property.imageUrls[0]);
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.detailModalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>{property.address}</h2>
                    <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">&times;</button>
                </div>
                
                <div style={styles.galleryContainer}>
                    <img src={mainImage} alt="Main view of the property" style={styles.mainImage} />
                    <div style={styles.thumbnailContainer}>
                        {property.imageUrls.map((url, index) => (
                            <img 
                                key={index} 
                                src={url} 
                                alt={`Thumbnail ${index + 1}`}
                                style={{
                                    ...styles.thumbnailImage,
                                    ...(mainImage === url ? styles.activeThumbnail : {})
                                }}
                                onClick={() => setMainImage(url)}
                            />
                        ))}
                    </div>
                </div>

                <div style={styles.detailSection}>
                    <div style={styles.propertyPrice}>₹{parseInt(property.price.replace(/,/g, ''), 10).toLocaleString('en-IN')}</div>
                    <div style={{...styles.propertyDetails, borderTop: 'none', paddingTop: '0.5rem', marginTop: '0.5rem'}}>
                         {property.type !== 'land' && property.type !== 'farm' && (
                            <>
                                <span><strong>{property.beds > 0 ? property.beds : '-'}</strong> {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                                <span><strong>{property.baths > 0 ? property.baths : '-'}</strong> {property.baths === 1 ? 'Bath' : 'Baths'}</span>
                            </>
                         )}
                        <span><strong>{property.sqft.toLocaleString('en-IN')}</strong> sqft</span>
                    </div>
                </div>

                <div style={styles.detailSection}>
                    <h3 style={styles.detailTitle}>About this place</h3>
                    <p style={{color: '#4A5568', lineHeight: 1.6}}>{property.description}</p>
                </div>

                <div style={styles.detailSection}>
                     <h3 style={styles.detailTitle}>Location</h3>
                     <div style={styles.mapContainer}>
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                     </div>
                </div>
            </div>
        </div>
    );
};

const AdminPasswordModal = ({ isOpen, onClose, onSubmit, password, setPassword, error }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Admin Access</h2>
                    <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">&times;</button>
                </div>
                <form onSubmit={onSubmit} style={styles.form}>
                    <label htmlFor="admin-password" style={{fontSize: '1rem', color: '#4A5568'}}>Enter Admin Password</label>
                    <input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.formInput}
                        required
                        autoFocus
                    />
                    {error && <p style={styles.errorMessage}>{error}</p>}
                    <button type="submit" style={styles.formButton}>Login</button>
                </form>
            </div>
        </div>
    );
};

const InfoModal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>{title}</h2>
                    <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">&times;</button>
                </div>
                <p style={{color: '#4A5568', lineHeight: 1.6, textAlign: 'center'}}>{message}</p>
            </div>
        </div>
    );
};


const App = () => {
  const [view, setView] = useState('login'); // 'login' or 'app'
  const [mainPage, setMainPage] = useState('home'); // 'home' or 'properties'
  const [properties, setProperties] = useState(initialProperties);
  const [userRole, setUserRole] = useState('customer'); // 'customer' or 'admin'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRentInfoModalOpen, setIsRentInfoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const listingsRef = useRef<HTMLElement>(null);

  const handleSelectRole = (role: 'customer' | 'seller') => {
      if(role === 'seller') {
          handleRoleChange('admin'); // Trigger password modal for seller
      } else {
          setUserRole('customer');
          setView('app');
      }
  };

  const handleAddProperty = (newProperty) => {
      setProperties(prev => [...prev, { ...newProperty, id: Date.now() }]);
      setIsAddModalOpen(false);
  };

  const handleViewDetails = (property: Property) => {
      setSelectedProperty(property);
  }
  
  const handleRoleChange = (selectedRole) => {
      if (selectedRole === 'admin') {
          setPasswordInput('');
          setPasswordError('');
          setIsPasswordModalOpen(true);
      } else {
          setUserRole('customer');
      }
  };
  
  const handleSearch = () => {
    setActiveSearch(searchQuery.trim());
  };

  const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (passwordInput === 'admin123') {
          setUserRole('admin');
          setIsPasswordModalOpen(false);
          // If login was triggered from login page, move to app
          if (view === 'login') {
            setView('app');
          }
      } else {
          setPasswordError('Incorrect password. Please try again.');
      }
  };
  
  const handleRentClick = () => {
    setIsRentInfoModalOpen(true);
  };

  const handleSellClick = () => {
      if (userRole === 'admin') {
          setIsAddModalOpen(true);
      } else {
          handleRoleChange('admin');
      }
  };
  
  const filteredProperties = properties.filter(property => {
      const searchMatch = activeSearch === '' || 
        property.address.toLowerCase().includes(activeSearch.toLowerCase());
    
      const filterMatch = activeFilter === 'all' || property.type === activeFilter;
    
      return searchMatch && filterMatch;
  });
  
  if (view === 'login') {
      return (
          <>
            <LoginPage onSelectRole={handleSelectRole} />
            <AdminPasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={handlePasswordSubmit}
                password={passwordInput}
                setPassword={setPasswordInput}
                error={passwordError}
              />
          </>
        );
  }

  return (
    <>
      <Header 
        userRole={userRole} 
        onRoleChange={handleRoleChange}
        onAddPropertyClick={() => setIsAddModalOpen(true)}
        onNavigate={setMainPage}
        onRentClick={handleRentClick}
        onSellClick={handleSellClick}
      />
      
      {mainPage === 'home' && <HomePage />}
      
      {mainPage === 'properties' && (
        <>
          <SearchSection 
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearch={handleSearch}
          />
          <PropertyListings 
            ref={listingsRef}
            properties={filteredProperties} 
            onViewDetails={handleViewDetails}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </>
      )}

      <Footer />
      <AddPropertyModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProperty={handleAddProperty}
      />
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
      <AdminPasswordModal
        isOpen={isPasswordModalOpen && view === 'app'} // Only show if not on login page
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        password={passwordInput}
        setPassword={setPasswordInput}
        error={passwordError}
      />
      <InfoModal
        isOpen={isRentInfoModalOpen}
        onClose={() => setIsRentInfoModalOpen(false)}
        title="Coming Soon!"
        message="Our rental property listings are currently under development. Please check back later!"
      />
    </>
  );
};


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);