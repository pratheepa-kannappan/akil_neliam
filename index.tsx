
import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- Mock Data ---
const initialProperties = [
  {
    id: 1,
    type: 'house',
    address: 'ECR, Chennai, Tamil Nadu',
    price: '35000000', // 3.5 Crore INR
    beds: 4,
    baths: 5,
    sqft: 3_200,
    imageUrls: [
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Stunning beachfront villa on East Coast Road with panoramic views of the Bay of Bengal. Features a modern design, spacious living areas, and a private path to the beach.',
    viewCount: 152,
    owner: { name: 'Mr. Ramesh Kumar', contact: '+91 98765 43210' },
  },
  {
    id: 2,
    type: 'house',
    address: 'R.S. Puram, Coimbatore, Tamil Nadu',
    price: '28000000', // 2.8 Crore INR
    beds: 5,
    baths: 6,
    sqft: 4_800,
    imageUrls: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Luxurious independent house in the heart of Coimbatore. This magnificent home boasts a grand entryway, a gourmet kitchen, a home theater, and a beautiful garden space.',
    viewCount: 210,
    owner: { name: 'Mrs. Priya Krishnan', contact: '+91 91234 56789' },
  },
  {
    id: 3,
    type: 'house',
    address: 'Kodaikanal, Tamil Nadu',
    price: '19500000', // 1.95 Crore INR
    beds: 3,
    baths: 4,
    sqft: 2_900,
    imageUrls: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Charming mountain retreat with breathtaking views of the surrounding hills. Features rustic yet elegant interiors, a stone fireplace, and serene natural surroundings.',
    viewCount: 305,
    owner: { name: 'Mr. David Raj', contact: '+91 99887 76655' },
  },
  {
    id: 5,
    type: 'land',
    address: 'OMR, Chennai, Tamil Nadu',
    price: '9500000', // 95 Lakhs INR
    beds: 0,
    baths: 0,
    sqft: 2400, // Plot size
    imageUrls: [
      'https://images.pexels.com/photos/1029615/pexels-photo-1029615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'An empty site on OMR, the IT corridor of Chennai. This 2400 sqft plot is a perfect empty place to build your dream home. Located in a gated community with all amenities.',
    viewCount: 88,
    owner: { name: 'OMR Developers', contact: '+91 95555 12345' },
  },
  {
    id: 6,
    type: 'farm',
    address: 'Pollachi, Coimbatore, Tamil Nadu',
    price: '42500000', // 4.25 Crore INR
    beds: 3,
    baths: 3,
    sqft: 435600, // 10 acres
    imageUrls: [
      'https://images.pexels.com/photos/247597/pexels-photo-247597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/161852/farm-barn-meadow-countryside-161852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Expansive coconut farm in the scenic outskirts of Pollachi. Includes a charming farmhouse, a large barn, and acres of fertile land with excellent water supply.',
    viewCount: 189,
    owner: { name: 'Mr. Gounder', contact: '+91 94433 22110' },
  },
  {
    id: 7,
    type: 'land',
    address: 'Saravanampatti, Coimbatore, Tamil Nadu',
    price: '7500000', // 75 Lakhs INR
    beds: 0,
    baths: 0,
    sqft: 1800, // Plot size
    imageUrls: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'An empty site ready for construction in a rapidly developing residential area of Saravanampatti. This is a fantastic place to build your home, close to tech parks and educational institutions.',
    viewCount: 121,
    owner: { name: 'Saravanampatti Estates', contact: '+91 97777 88888' },
  },
   {
    id: 8,
    type: 'farm',
    address: 'Near Madurai, Tamil Nadu',
    price: '21000000', // 2.1 Crore INR
    beds: 2,
    baths: 2,
    sqft: 217800, // 5 acres
    imageUrls: [
      'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/568021/pexels-photo-568021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Picturesque farm land near Madurai with a traditional farmhouse. Surrounded by paddy fields and pasture, perfect for integrated organic farming.',
    viewCount: 95,
    owner: { name: 'Mrs. Meenakshi Sundaram', contact: '+91 93322 11009' },
  },
];

// --- Mock Rental Data ---
const initialRentals = [
  {
    id: 101,
    type: 'apartment',
    address: 'Velachery, Chennai, Tamil Nadu',
    rent: 25000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    leaseTerm: '11 months',
    securityDeposit: 100000,
    imageUrls: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Modern 2BHK apartment in a prime location with easy access to IT parks and shopping malls. Comes with covered parking.',
    viewCount: 450,
    owner: { name: 'Mr. Suresh', contact: '+91 98400 98400' },
  },
  {
    id: 102,
    type: 'house',
    address: 'Saibaba Colony, Coimbatore, Tamil Nadu',
    rent: 65000,
    beds: 3,
    baths: 3,
    sqft: 1800,
    leaseTerm: '1 year',
    securityDeposit: 300000,
    imageUrls: [
      'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Spacious 3BHK independent house with a small garden, located in a quiet residential neighborhood. Ideal for families.',
    viewCount: 320,
    owner: { name: 'Mr. Anand', contact: '+91 97531 86420' },
  },
  {
    id: 103,
    type: 'apartment',
    address: 'Adyar, Chennai, Tamil Nadu',
    rent: 120000,
    beds: 4,
    baths: 4,
    sqft: 2500,
    leaseTerm: '2 years',
    securityDeposit: 600000,
    imageUrls: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Luxurious, fully-furnished 4BHK apartment with a sea view. Includes access to a swimming pool, gym, and clubhouse.',
    viewCount: 512,
    owner: { name: 'Ms. Shalini Iyer', contact: '+91 91919 28282' },
  },
  {
    id: 104,
    type: 'apartment',
    address: 'Gandhipuram, Coimbatore, Tamil Nadu',
    rent: 18000,
    beds: 1,
    baths: 1,
    sqft: 750,
    leaseTerm: '11 months',
    securityDeposit: 75000,
    imageUrls: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Cozy 1BHK apartment perfect for students or young professionals. Located in the city center with excellent connectivity.',
    viewCount: 680,
    owner: { name: 'City Rentals Inc.', contact: '+91 99944 45566' },
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
    position: 'relative',
  },
  savedCountBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-15px',
    backgroundColor: '#F97316',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
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
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  propertyImageContainer: {
    width: '100%',
    height: '200px',
    cursor: 'pointer',
    position: 'relative',
  },
  saveButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1,
  },
  compareCheckboxContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1,
  },
  compareCheckbox: {
      width: '20px',
      height: '20px',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  propertyInfo: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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
    marginTop: 'auto',
    alignItems: 'center',
  },
  viewCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    marginLeft: 'auto',
    color: '#64748B',
    fontSize: '0.9rem',
  },
  adminControls: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  },
  adminButton: {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      flex: 1,
  },
  editButton: {
      backgroundColor: '#3B82F6',
      color: '#fff',
  },
  deleteButton: {
      backgroundColor: '#EF4444',
      color: '#fff',
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
  compareModalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '1000px',
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
  compareButtonDisabled: {
    backgroundColor: '#CBD5E1',
    cursor: 'not-allowed',
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
  advancedFilterContainer: {
    backgroundColor: '#fff',
    padding: '1.5rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    alignItems: 'flex-end',
    marginBottom: '2rem',
  },
  filterControl: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  filterLabel: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#4A5568',
  },
  filterInput: {
    padding: '0.6rem 0.8rem',
    fontSize: '0.9rem',
    border: '1px solid #CBD5E1',
    borderRadius: '6px',
    width: '100%',
    boxSizing: 'border-box',
  },
  filterButtonContainer: {
      display: 'flex',
      gap: '0.5rem',
      gridColumn: '1 / -1', // Span full width on multi-row
      justifyContent: 'flex-end',
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
  homePageContainer: {
    backgroundColor: '#fff',
  },
  homeSection: {
    padding: '4rem 2rem',
  },
  homeSectionAlt: {
    backgroundColor: '#F1F5F9',
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
    backgroundColor: '#fff', // Ensure cards are white on gray background
  },
  contactInfo: {
    listStyle: 'none',
    padding: 0,
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#4A5568',
  },
  founderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    maxWidth: '900px',
    margin: '2rem auto 0',
    flexWrap: 'wrap',
  },
  founderImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  founderInfo: {
    flex: 1,
    minWidth: '300px',
  },
  howItWorksSection: {
      backgroundColor: '#0D2F4B',
      color: '#ffffff',
      padding: '4rem 2rem',
      textAlign: 'center',
  },
  howItWorksSubtitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      letterSpacing: '2px',
      color: '#E2E8F0',
      marginBottom: '0.5rem',
  },
  howItWorksTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: 0,
  },
  titleDivider: {
      width: '60px',
      height: '3px',
      backgroundColor: '#F97316',
      margin: '1.5rem auto 3rem',
      border: 'none',
  },
  howItWorksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      maxWidth: '1100px',
      margin: '0 auto',
  },
  stepCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  stepIconContainer: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1.5rem',
      position: 'relative',
      border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  stepNumber: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#D95D41',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '0.9rem',
      border: '2px solid #0D2F4B',
  },
  stepTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '0.5rem',
  },
  stepDescription: {
      fontSize: '0.95rem',
      color: '#CBD5E1',
      lineHeight: 1.6,
      maxWidth: '220px',
  },
  compareGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 2fr',
    gap: '0.5rem',
    alignItems: 'center',
  },
  compareHeaderCell: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    padding: '1rem',
    textAlign: 'center',
    color: '#0D2F4B',
  },
  compareImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  compareLabelCell: {
    fontWeight: 'bold',
    padding: '1rem',
    backgroundColor: '#F8FAFC',
    borderRight: '1px solid #E2E8F0',
    textAlign: 'right',
  },
  compareCell: {
    padding: '1rem',
    textAlign: 'center',
  },
  highlightedCell: {
    backgroundColor: '#F0FFF4',
    fontWeight: 'bold',
    color: '#2F855A',
  },
};


// --- Components ---

const HowItWorksSection = () => {
    const steps = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5z"/>
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6z"/>
                </svg>
            ),
            title: 'EXPLAIN YOUR NEEDS',
            description: 'Provide necessary information to our sales team.',
        },
        {
            icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zM8 2h1.5a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-8z"/>
                </svg>
            ),
            title: 'SELECT PACKAGE',
            description: 'Choose one of the dozen available packages.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 12.5A1.5 1.5 0 0 1 2.5 11h11A1.5 1.5 0 0 1 15 12.5v1.026a.5.5 0 0 1-.044.207l-.936 1.872A.5.5 0 0 1 13.5 16h-11a.5.5 0 0 1-.416-.793l-.936-1.872A.5.5 0 0 1 1 13.526V12.5zM2.5 12a.5.5 0 0 0-.5.5v1.026a1.5 1.5 0 0 0 .132.624l.936 1.871a1.5 1.5 0 0 0 1.248.879h10.368a1.5 1.5 0 0 0 1.248-.879l.936-1.871a1.5 1.5 0 0 0 .132-.624V12.5a.5.5 0 0 0-.5.5h-11z"/>
                    <path d="M8.5 4a.5.5 0 0 0-1 0v4.793l-1.646-1.647a.5.5 0 0 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.708-.708L8.5 8.793V4z"/>
                </svg>
            ),
            title: 'RELAX AND ENJOY',
            description: 'Let our team take care of your property while you rest.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11z"/>
                  <path d="M15 13H1a1 1 0 0 0-1 1v.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V14a1 1 0 0 0-1-1z"/>
                </svg>
            ),
            title: 'GET YOUR LEADS',
            description: 'Receive the leads in your inbox every day.',
        },
    ];

    return (
        <section style={styles.howItWorksSection}>
            <h3 style={styles.howItWorksSubtitle}>IN 4 EASY STEPS</h3>
            <h2 style={styles.howItWorksTitle}>How We Operate</h2>
            <hr style={styles.titleDivider} />
            <div style={styles.howItWorksGrid} className="how-it-works-grid">
                {steps.map((step, index) => (
                    <div key={index} style={styles.stepCard} className="step-card">
                        <div style={styles.stepIconContainer}>
                            {step.icon}
                            <div style={styles.stepNumber}>{index + 1}</div>
                        </div>
                         <div className="step-hover-info">
                            {step.description}
                        </div>
                    </div>
                ))}
            </div>
             <style>{`
                @media (max-width: 900px) {
                    .how-it-works-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 3rem 1rem;
                    }
                }
                @media (max-width: 500px) {
                    .how-it-works-grid {
                        grid-template-columns: 1fr;
                         gap: 3rem;
                    }
                }
                .step-card {
                    position: relative;
                }
                .step-hover-info {
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%) translateY(30px);
                    background-color: rgba(255, 255, 255, 0.95);
                    color: #0D2F4B;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: bold;
                    width: 200px;
                    text-align: center;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
                    pointer-events: none;
                }
                .step-card:hover .step-hover-info {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0px);
                }
            `}</style>
        </section>
    );
};

const HomePage = () => (
    <div style={styles.homePageContainer}>
        <section style={styles.homeSection}>
            <h2 style={styles.homeSectionTitle}>About Akil Neliam</h2>
            <p style={styles.homeText}>
                Akil Neliam is a premier real estate consultancy dedicated to simplifying your property journey. Whether you are buying your dream home, selling a property, or investing in land, we provide expert guidance and personalized service every step of the way. Our foundation is built on trust, transparency, and an unwavering commitment to our clients' success.
            </p>
        </section>

        <section style={{...styles.homeSection, ...styles.homeSectionAlt}}>
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
            <div style={styles.founderContainer}>
                <img 
                    src="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Kannappan, Founder of Akil Neliam"
                    style={styles.founderImage}
                />
                <div style={styles.founderInfo}>
                    <h3 style={{fontSize: '1.8rem', color: '#0D2F4B', margin: 0, textAlign: 'left' }}>Kannappan</h3>
                    <p style={{fontSize: '1.2rem', color: '#F97316', marginTop: '0.25rem', fontWeight: 'bold', textAlign: 'left'}}>Founder & Senior Document Writer</p>
                    <p style={{...styles.homeText, textAlign: 'left', margin: 0, maxWidth: 'none'}}>
                       With decades of experience in the real estate sector, Kannappan is a master document writer known for his meticulous attention to detail and deep understanding of property law. His expertise ensures that every transaction is handled with the utmost professionalism and legal precision, safeguarding your interests at all times.
                    </p>
                </div>
            </div>
        </section>

        <HowItWorksSection />

        <section style={{...styles.homeSection, ...styles.homeSectionAlt}}>
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

const Header = ({ userRole, onRoleChange, onAddPropertyClick, onNavigate, savedCount }) => (
  <header style={styles.header}>
    <div style={styles.logo}>Akil Neliam</div>
    <nav style={styles.nav}>
      <button onClick={() => onNavigate('home')} style={styles.navLink}>Home</button>
      <button onClick={() => onNavigate('properties')} style={styles.navLink}>Properties</button>
      <button onClick={() => onNavigate('rent')} style={styles.navLink}>Rent</button>
      <button onClick={() => onNavigate('saved')} style={styles.navLink}>
        Saved
        {savedCount > 0 && <span style={styles.savedCountBadge}>{savedCount}</span>}
      </button>
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


const PropertyCard = ({ property, onViewDetails, userRole, onEdit, onDelete, isSaved, onToggleSave, showCompareCheckbox, isCompared, onToggleCompare }) => {
    
    const handleAdminAction = (e, action) => {
        e.stopPropagation(); // Prevent card click from firing
        action();
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        onToggleSave(property.id);
    };

    return (
      <div 
        style={styles.propertyCard}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
        }} 
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }}
      >
        <div onClick={() => onViewDetails(property)} style={styles.propertyImageContainer}>
            {showCompareCheckbox && (
                <div style={styles.compareCheckboxContainer} onClick={(e) => { e.stopPropagation(); onToggleCompare(property.id); }}>
                    <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => {}} // Click is handled by the parent div
                        style={styles.compareCheckbox}
                        aria-label="Select for comparison"
                    />
                </div>
            )}
            <button onClick={handleSaveClick} style={styles.saveButton} aria-label={isSaved ? 'Unsave property' : 'Save property'}>
                {isSaved ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#F97316" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                    </svg>
                ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D2F4B" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                )}
            </button>
            <img src={property.imageUrls[0]} alt={`View of ${property.address}`} style={styles.propertyImage} />
        </div>
        <div style={styles.propertyInfo}>
          <div style={styles.propertyPrice}>₹{parseInt(property.price.replace(/,/g, ''), 10).toLocaleString('en-IN')}</div>
          <p style={styles.propertyAddress}>{property.address}</p>
          <div style={styles.propertyDetails}>
            {property.type !== 'land' && (
                <>
                    <span><strong>{property.beds > 0 ? property.beds : '-'}</strong> {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                    <span><strong>{property.baths > 0 ? property.baths : '-'}</strong> {property.baths === 1 ? 'Bath' : 'Baths'}</span>
                </>
            )}
            <span><strong>{property.sqft.toLocaleString('en-IN')}</strong> sqft</span>
            <span style={styles.viewCount} title={`${property.viewCount} views`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
                {property.viewCount}
            </span>
          </div>
          {userRole === 'admin' && (
              <div style={styles.adminControls}>
                  <button onClick={(e) => handleAdminAction(e, () => onEdit(property))} style={{...styles.adminButton, ...styles.editButton}}>Edit</button>
                  <button onClick={(e) => handleAdminAction(e, () => onDelete(property.id))} style={{...styles.adminButton, ...styles.deleteButton}}>Delete</button>
              </div>
          )}
        </div>
      </div>
    );
};

const AdvancedFilterBar = ({ onApplyFilters, onResetFilters }) => {
    const initialFilterState = {
        type: 'all',
        beds: 'any',
        baths: 'any',
        minPrice: '',
        maxPrice: '',
    };
    const [filters, setFilters] = useState(initialFilterState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };
    
    const handleReset = () => {
        setFilters(initialFilterState);
        onResetFilters();
    };

    return (
        <div style={styles.advancedFilterContainer}>
            <div style={styles.filterControl}>
                <label htmlFor="type-filter" style={styles.filterLabel}>Type</label>
                <select id="type-filter" name="type" value={filters.type} onChange={handleChange} style={styles.filterInput}>
                    <option value="all">All</option>
                    <option value="house">House</option>
                    <option value="land">Land</option>
                    <option value="farm">Farm</option>
                </select>
            </div>
            <div style={styles.filterControl}>
                <label htmlFor="beds-filter" style={styles.filterLabel}>Beds</label>
                <select id="beds-filter" name="beds" value={filters.beds} onChange={handleChange} style={styles.filterInput}>
                    <option value="any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                </select>
            </div>
            <div style={styles.filterControl}>
                <label htmlFor="baths-filter" style={styles.filterLabel}>Baths</label>
                <select id="baths-filter" name="baths" value={filters.baths} onChange={handleChange} style={styles.filterInput}>
                    <option value="any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                </select>
            </div>
            <div style={styles.filterControl}>
                <label htmlFor="min-price-filter" style={styles.filterLabel}>Min Price</label>
                <input type="number" id="min-price-filter" name="minPrice" placeholder="e.g., 5000000" value={filters.minPrice} onChange={handleChange} style={styles.filterInput} />
            </div>
            <div style={styles.filterControl}>
                <label htmlFor="max-price-filter" style={styles.filterLabel}>Max Price</label>
                <input type="number" id="max-price-filter" name="maxPrice" placeholder="e.g., 10000000" value={filters.maxPrice} onChange={handleChange} style={styles.filterInput} />
            </div>
            <div style={styles.filterControl}>
                <label style={{...styles.filterLabel, visibility: 'hidden'}}>Actions</label>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button onClick={handleApply} style={{...styles.addPropertyButton, flex: 1}}>Apply</button>
                    <button onClick={handleReset} style={{...styles.adminButton, ...styles.deleteButton, flex: 1, backgroundColor: '#64748B'}}>Reset</button>
                </div>
            </div>
        </div>
    );
};

// --- Type Interfaces ---
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
    viewCount: number;
    owner: { name: string; contact: string };
}

interface RentalProperty {
  id: number;
  type: string;
  address: string;
  rent: number;
  beds: number;
  baths: number;
  sqft: number;
  leaseTerm: string;
  securityDeposit: number;
  imageUrls: string[];
  description: string;
  viewCount: number;
  owner: { name: string; contact: string };
}

interface PropertyListingsProps {
    properties: Property[];
    onViewDetails: (property: Property) => void;
    onApplyFilters: (filters: object) => void;
    onResetFilters: () => void;
    userRole: string;
    onEdit: (property: Property) => void;
    onDelete: (id: number) => void;
    savedProperties: number[];
    onToggleSave: (id: number) => void;
}

const PropertyListings = React.forwardRef<HTMLElement, PropertyListingsProps>(({ properties, onViewDetails, onApplyFilters, onResetFilters, userRole, onEdit, onDelete, savedProperties, onToggleSave }, ref) => (
    <main style={styles.listingsContainer} ref={ref}>
        <h2 style={{ fontSize: '2rem', color: '#0D2F4B', marginBottom: '1rem', textAlign: 'center' }}>Featured Listings</h2>
        <AdvancedFilterBar onApplyFilters={onApplyFilters} onResetFilters={onResetFilters} />
        {properties.length > 0 ? (
            <div style={styles.listingsGrid}>
                {properties.map(prop => (
                    <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        onViewDetails={onViewDetails} 
                        userRole={userRole} 
                        onEdit={onEdit} 
                        onDelete={onDelete}
                        isSaved={savedProperties.includes(prop.id)}
                        onToggleSave={onToggleSave}
                        showCompareCheckbox={false}
                        isCompared={false}
                        onToggleCompare={() => {}}
                    />
                ))}
            </div>
        ) : (
            <p style={{textAlign: 'center', color: '#4A5568', fontSize: '1.1rem', marginTop: '2rem'}}>
                No properties found matching your criteria. Please try a different search or filter.
            </p>
        )}
    </main>
));

const RentalPropertyCard = ({ property, onViewDetails, isSaved, onToggleSave, showCompareCheckbox, isCompared, onToggleCompare, userRole, onEdit, onDelete }: {property: RentalProperty, onViewDetails: (property: RentalProperty) => void, isSaved: boolean, onToggleSave: (id: number) => void, showCompareCheckbox?: boolean, isCompared?: boolean, onToggleCompare?: (id: number) => void, userRole: string, onEdit: (property: RentalProperty) => void, onDelete: (id: number) => void}) => {
    
    const handleSaveClick = (e) => {
        e.stopPropagation();
        onToggleSave(property.id);
    };

    const handleAdminAction = (e, action) => {
        e.stopPropagation();
        action();
    };

    return (
        <div
          style={styles.propertyCard}
          onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
          }}
          onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          <div onClick={() => onViewDetails(property)} style={styles.propertyImageContainer}>
             {showCompareCheckbox && (
                <div style={styles.compareCheckboxContainer} onClick={(e) => { e.stopPropagation(); onToggleCompare(property.id); }}>
                    <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => {}} // Click is handled by the parent div
                        style={styles.compareCheckbox}
                        aria-label="Select for comparison"
                    />
                </div>
            )}
             <button onClick={handleSaveClick} style={styles.saveButton} aria-label={isSaved ? 'Unsave property' : 'Save property'}>
                {isSaved ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#F97316" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                    </svg>
                ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D2F4B" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                )}
            </button>
              <img src={property.imageUrls[0]} alt={`View of ${property.address}`} style={styles.propertyImage} />
          </div>
          <div style={styles.propertyInfo}>
            <div style={styles.propertyPrice}>₹{property.rent.toLocaleString('en-IN')}<span style={{fontSize: '1rem', fontWeight: 'normal', color: '#4A5568'}}>/month</span></div>
            <p style={styles.propertyAddress}>{property.address}</p>
            <div style={styles.propertyDetails}>
              <span><strong>{property.beds}</strong> Beds</span>
              <span><strong>{property.baths}</strong> Baths</span>
              <span><strong>{property.sqft.toLocaleString('en-IN')}</strong> sqft</span>
              <span style={styles.viewCount} title={`${property.viewCount} views`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
                {property.viewCount}
            </span>
            </div>
            {userRole === 'admin' && (
              <div style={styles.adminControls}>
                  <button onClick={(e) => handleAdminAction(e, () => onEdit(property))} style={{...styles.adminButton, ...styles.editButton}}>Edit</button>
                  <button onClick={(e) => handleAdminAction(e, () => onDelete(property.id))} style={{...styles.adminButton, ...styles.deleteButton}}>Delete</button>
              </div>
            )}
          </div>
        </div>
    )
};

const RentFilterBar = ({ activeFilter, onFilterChange }) => {
    const filters = {
        'any': 'Any Rent',
        'lt50': '< ₹50,000',
        '50-100': '₹50k - ₹1L',
        'gt100': '> ₹1 Lakh',
    };

    return (
        <div style={styles.filterContainer}>
            {Object.entries(filters).map(([key, value]) => (
                <button
                    key={key}
                    onClick={() => onFilterChange(key)}
                    style={{
                        ...styles.filterButton,
                        ...(activeFilter === key ? styles.activeFilterButton : {})
                    }}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

const RentPage = ({ rentals, savedProperties, onToggleSave, userRole, onEdit, onDelete, onViewDetails }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSearch, setActiveSearch] = useState('');
    const [rentFilter, setRentFilter] = useState('any');
    
    const handleSearch = () => setActiveSearch(searchQuery.trim());

    const filteredRentals = rentals.filter(property => {
        const searchMatch = activeSearch === '' || property.address.toLowerCase().includes(activeSearch.toLowerCase());

        const rentMatch = () => {
            switch (rentFilter) {
                case 'lt50': return property.rent < 50000;
                case '50-100': return property.rent >= 50000 && property.rent <= 100000;
                case 'gt100': return property.rent > 100000;
                case 'any':
                default:
                    return true;
            }
        };

        return searchMatch && rentMatch();
    });

    return (
        <>
            <SearchSection 
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onSearch={handleSearch}
            />
            <main style={styles.listingsContainer}>
                <h2 style={{ fontSize: '2rem', color: '#0D2F4B', marginBottom: '1rem', textAlign: 'center' }}>Properties for Rent</h2>
                <RentFilterBar activeFilter={rentFilter} onFilterChange={setRentFilter} />
                 {filteredRentals.length > 0 ? (
                    <div style={styles.listingsGrid}>
                        {filteredRentals.map(prop => 
                            <RentalPropertyCard 
                                key={prop.id} 
                                property={prop} 
                                onViewDetails={onViewDetails} 
                                isSaved={savedProperties.includes(prop.id)}
                                onToggleSave={onToggleSave}
                                userRole={userRole}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        )}
                    </div>
                ) : (
                    <p style={{textAlign: 'center', color: '#4A5568', fontSize: '1.1rem', marginTop: '2rem'}}>
                        No rental properties found matching your criteria.
                    </p>
                )}
            </main>
        </>
    );
};


const Footer = () => (
    <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Akil Neliam. All rights reserved.</p>
    </footer>
);

// Fix: Refactored PropertyFormModal to use a consistent state shape for `formData`, resolving multiple TypeScript errors.
const PropertyFormModal = ({ isOpen, onClose, onSave, listingToEdit }) => {
    const [listingFor, setListingFor] = useState('sale'); // 'sale' or 'rent'

    // Initialize formData with a complete and consistent shape to prevent type errors.
    const initialFormState = {
        address: '',
        sqft: '',
        imageUrl: '',
        price: '',
        beds: '',
        baths: '',
        type: 'house',
        rent: '',
        leaseTerm: '',
        securityDeposit: '',
        ownerName: '',
        ownerContact: '',
    };
    
    const [formData, setFormData] = useState(initialFormState);
    
    const isEditing = !!listingToEdit;
    
    const resetForm = (type = 'sale') => {
        if (type === 'sale') {
            setFormData({ ...initialFormState, type: 'house' });
        } else {
            setFormData({ ...initialFormState, type: 'apartment' });
        }
    };

    useEffect(() => {
        if (isEditing) {
            const commonEditData = {
                address: listingToEdit.address,
                sqft: String(listingToEdit.sqft),
                imageUrl: listingToEdit.imageUrls[0],
                type: listingToEdit.type,
                ownerName: listingToEdit.owner.name,
                ownerContact: listingToEdit.owner.contact,
            };

            if ('rent' in listingToEdit) {
                setListingFor('rent');
                setFormData({
                    ...initialFormState,
                    ...commonEditData,
                    rent: String(listingToEdit.rent),
                    beds: String(listingToEdit.beds),
                    baths: String(listingToEdit.baths),
                    leaseTerm: listingToEdit.leaseTerm,
                    securityDeposit: String(listingToEdit.securityDeposit),
                });
            } else {
                setListingFor('sale');
                setFormData({
                    ...initialFormState,
                    ...commonEditData,
                    price: listingToEdit.price.replace(/,/g, ''),
                    beds: String(listingToEdit.beds || ''),
                    baths: String(listingToEdit.baths || ''),
                });
            }
        } else {
            setListingFor('sale');
            resetForm('sale');
        }
    }, [listingToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleListingForChange = (type) => {
        if (!isEditing) {
            setListingFor(type);
            resetForm(type);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const commonData = {
            id: isEditing ? listingToEdit.id : undefined,
            address: formData.address,
            sqft: parseInt(formData.sqft, 10),
            beds: parseInt(formData.beds, 10) || 0,
            baths: parseInt(formData.baths, 10) || 0,
            type: formData.type,
            imageUrls: [formData.imageUrl, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
            description: isEditing ? listingToEdit.description : 'A newly added property.',
            viewCount: isEditing ? listingToEdit.viewCount : 0,
            owner: { name: formData.ownerName, contact: formData.ownerContact },
        };
        
        let finalData;
        if (listingFor === 'sale') {
            finalData = {
                ...commonData,
                price: formData.price.replace(/,/g, ''),
                beds: formData.type === 'house' || formData.type === 'farm' ? commonData.beds : 0,
                baths: formData.type === 'house' || formData.type === 'farm' ? commonData.baths : 0,
            };
        } else { // 'rent'
            finalData = {
                ...commonData,
                rent: parseInt(formData.rent, 10),
                leaseTerm: formData.leaseTerm,
                securityDeposit: parseInt(formData.securityDeposit, 10),
            };
        }
        
        onSave(finalData);
        onClose();
    };

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>{isEditing ? 'Edit Listing' : 'Add New Listing'}</h2>
                    <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">&times;</button>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <button type="button" onClick={() => handleListingForChange('sale')} disabled={isEditing} style={{...styles.filterButton, flex: 1, ...(listingFor === 'sale' ? styles.activeFilterButton : {})}}>For Sale</button>
                        <button type="button" onClick={() => handleListingForChange('rent')} disabled={isEditing} style={{...styles.filterButton, flex: 1, ...(listingFor === 'rent' ? styles.activeFilterButton : {})}}>For Rent</button>
                    </div>
                
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={styles.formInput} required />
                    
                    {listingFor === 'sale' ? (
                        <select name="type" value={formData.type} onChange={handleChange} style={styles.formInput}>
                            <option value="house">House</option>
                            <option value="land">Land</option>
                            <option value="farm">Farm</option>
                        </select>
                    ) : (
                        <select name="type" value={formData.type} onChange={handleChange} style={styles.formInput}>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                        </select>
                    )}
                    
                    {listingFor === 'sale' ? (
                        <input type="number" name="price" placeholder="Price (INR)" value={formData.price} onChange={handleChange} style={styles.formInput} required />
                    ) : (
                        <input type="number" name="rent" placeholder="Monthly Rent (INR)" value={formData.rent} onChange={handleChange} style={styles.formInput} required />
                    )}

                    {(formData.type === 'house' || formData.type === 'apartment' || formData.type === 'farm') && (
                        <>
                            <input type="number" name="beds" placeholder="Beds" value={formData.beds} onChange={handleChange} style={styles.formInput} />
                            <input type="number" name="baths" placeholder="Baths" value={formData.baths} onChange={handleChange} style={styles.formInput} />
                        </>
                    )}
                    
                    {listingFor === 'rent' && (
                        <>
                            <input type="text" name="leaseTerm" placeholder="Lease Term (e.g., 11 months)" value={formData.leaseTerm} onChange={handleChange} style={styles.formInput} required />
                            <input type="number" name="securityDeposit" placeholder="Security Deposit (INR)" value={formData.securityDeposit} onChange={handleChange} style={styles.formInput} required />
                        </>
                    )}

                    <input type="number" name="sqft" placeholder="Square Feet" value={formData.sqft} onChange={handleChange} style={styles.formInput} required />
                    <input type="url" name="imageUrl" placeholder="Featured Image URL" value={formData.imageUrl} onChange={handleChange} style={styles.formInput} required />
                    <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} style={styles.formInput} required />
                    <input type="text" name="ownerContact" placeholder="Owner Contact" value={formData.ownerContact} onChange={handleChange} style={styles.formInput} required />
                    <button type="submit" style={styles.formButton}>{isEditing ? 'Save Changes' : 'Add Listing'}</button>
                </form>
            </div>
        </div>
    );
};

const PropertyDetailModal = ({ property, onClose, isSaved, onToggleSave }: { property: (Property | RentalProperty) | null, onClose: () => void, isSaved: boolean, onToggleSave: (id: number) => void }) => {
    if (!property) return null;

    const [mainImage, setMainImage] = useState(property.imageUrls[0]);
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`;
    
    const isRental = 'rent' in property;

    useEffect(() => {
        if(property) {
            setMainImage(property.imageUrls[0])
        }
    }, [property]);

    const handleSaveClick = () => {
        onToggleSave(property.id);
    };

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

                <div style={{...styles.detailSection, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={styles.propertyPrice}>
                        {isRental
                            ? <>₹{property.rent.toLocaleString('en-IN')}<span style={{fontSize: '1rem', fontWeight: 'normal', color: '#4A5568'}}>/month</span></>
                            : <>₹{parseInt((property as Property).price.replace(/,/g, ''), 10).toLocaleString('en-IN')}</>
                        }
                    </div>
                    <button 
                        onClick={handleSaveClick} 
                        style={{
                            ...styles.searchButton, 
                            backgroundColor: isSaved ? '#0D2F4B' : '#F97316',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                         {isSaved ? (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                            </svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                            </svg>
                        )}
                        {isSaved ? 'Unsave Property' : 'Save Property'}
                    </button>
                </div>
                <div style={{...styles.propertyDetails, borderTop: 'none', paddingTop: '0', marginTop: '0.5rem'}}>
                     {property.type !== 'land' && (
                        <>
                            <span><strong>{property.beds > 0 ? property.beds : '-'}</strong> {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                            <span><strong>{property.baths > 0 ? property.baths : '-'}</strong> {property.baths === 1 ? 'Bath' : 'Baths'}</span>
                        </>
                     )}
                    <span><strong>{property.sqft.toLocaleString('en-IN')}</strong> sqft</span>
                     <span style={styles.viewCount} title={`${property.viewCount} views`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        {property.viewCount}
                    </span>
                </div>

                {isRental && (
                    <div style={styles.detailSection}>
                        <h3 style={styles.detailTitle}>Rental Details</h3>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#4A5568' }}>
                            <li style={{marginBottom: '0.5rem'}}><strong>Lease Term:</strong> {property.leaseTerm}</li>
                            <li><strong>Security Deposit:</strong> ₹{property.securityDeposit.toLocaleString('en-IN')}</li>
                        </ul>
                    </div>
                )}

                <div style={styles.detailSection}>
                    <h3 style={styles.detailTitle}>About this place</h3>
                    <p style={{color: '#4A5568', lineHeight: 1.6}}>{property.description}</p>
                </div>
                
                 <div style={styles.detailSection}>
                    <h3 style={styles.detailTitle}>Contact Owner</h3>
                    <ul style={{ listStyle: 'none', padding: 0, color: '#4A5568' }}>
                        <li style={{marginBottom: '0.5rem'}}><strong>Name:</strong> {property.owner.name}</li>
                        <li><strong>Phone:</strong> {property.owner.contact}</li>
                    </ul>
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

const CompareRow = ({ label, value1, value2, higherIsBetter }) => {
    let highlight1 = false;
    let highlight2 = false;

    // Use a robust regex to extract numbers, handling commas
    const num1 = parseFloat(String(value1).replace(/,/g, ''));
    const num2 = parseFloat(String(value2).replace(/,/g, ''));

    if (!isNaN(num1) && !isNaN(num2) && num1 !== num2 && higherIsBetter !== null) {
        if (higherIsBetter) {
            if (num1 > num2) highlight1 = true;
            if (num2 > num1) highlight2 = true;
        } else { // Lower is better
            if (num1 < num2) highlight1 = true;
            if (num2 < num1) highlight2 = true;
        }
    }
    
    const cellStyle = (isHighlighted) => ({
        ...styles.compareCell,
        ...(isHighlighted ? styles.highlightedCell : {})
    });

    return (
        <>
            <div style={styles.compareLabelCell}>{label}</div>
            <div style={cellStyle(highlight1)}>{value1 ?? 'N/A'}</div>
            <div style={cellStyle(highlight2)}>{value2 ?? 'N/A'}</div>
        </>
    );
};

const CompareModal = ({ isOpen, onClose, properties }) => {
    if (!isOpen || properties.length !== 2) return null;

    const [prop1, prop2] = properties;
    const isRental1 = 'rent' in prop1;
    const isRental2 = 'rent' in prop2;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.compareModalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Compare Properties</h2>
                    <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">&times;</button>
                </div>
                <div style={styles.compareGrid}>
                    <div style={styles.compareHeaderCell}>Feature</div>
                    <div style={styles.compareHeaderCell}>
                        <img src={prop1.imageUrls[0]} alt={prop1.address} style={styles.compareImage} />
                        {prop1.address}
                    </div>
                    <div style={styles.compareHeaderCell}>
                        <img src={prop2.imageUrls[0]} alt={prop2.address} style={styles.compareImage} />
                        {prop2.address}
                    </div>
                    
                    {isRental1 || isRental2 ? (
                        <CompareRow label="Monthly Rent (₹)" value1={isRental1 ? (prop1 as RentalProperty).rent.toLocaleString('en-IN') : 'N/A'} value2={isRental2 ? (prop2 as RentalProperty).rent.toLocaleString('en-IN') : 'N/A'} higherIsBetter={false} />
                    ) : (
                        <CompareRow label="Price (₹)" value1={parseInt((prop1 as Property).price.replace(/,/g, ''), 10).toLocaleString('en-IN')} value2={parseInt((prop2 as Property).price.replace(/,/g, ''), 10).toLocaleString('en-IN')} higherIsBetter={false} />
                    )}

                    <CompareRow label="Beds" value1={prop1.beds} value2={prop2.beds} higherIsBetter={true} />
                    <CompareRow label="Baths" value1={prop1.baths} value2={prop2.baths} higherIsBetter={true} />
                    <CompareRow label="Area (sqft)" value1={prop1.sqft.toLocaleString('en-IN')} value2={prop2.sqft.toLocaleString('en-IN')} higherIsBetter={true} />

                    {isRental1 || isRental2 && (
                        <>
                            <CompareRow label="Lease Term" value1={isRental1 ? (prop1 as RentalProperty).leaseTerm : 'N/A'} value2={isRental2 ? (prop2 as RentalProperty).leaseTerm : 'N/A'} higherIsBetter={null} />
                            <CompareRow label="Security Deposit (₹)" value1={isRental1 ? (prop1 as RentalProperty).securityDeposit.toLocaleString('en-IN') : 'N/A'} value2={isRental2 ? (prop2 as RentalProperty).securityDeposit.toLocaleString('en-IN') : 'N/A'} higherIsBetter={false} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const SavedPropertiesPage = ({ allProperties, allRentals, savedIds, onToggleSave, onViewDetails }) => {
    const [propertiesToCompare, setPropertiesToCompare] = useState<number[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const savedSaleProps = allProperties.filter(p => savedIds.includes(p.id));
    const savedRentProps = allRentals.filter(p => savedIds.includes(p.id));

    const handleToggleCompare = (propertyId: number) => {
        setPropertiesToCompare(prev => {
            const isSelected = prev.includes(propertyId);
            if (isSelected) {
                return prev.filter(id => id !== propertyId);
            }
            if (prev.length < 2) {
                return [...prev, propertyId];
            }
            // If 2 are already selected, do not add another one
            return prev;
        });
    };

    const getPropertiesForModal = () => {
        const allSaved = [...savedSaleProps, ...savedRentProps];
        return propertiesToCompare.map(id => allSaved.find(p => p.id === id)).filter(Boolean);
    };

    const isCompareDisabled = propertiesToCompare.length !== 2;

    return (
        <main style={styles.listingsContainer}>
            <h2 style={{ fontSize: '2rem', color: '#0D2F4B', marginBottom: '1rem', textAlign: 'center' }}>Your Saved Properties</h2>
            
            {(savedSaleProps.length > 0 || savedRentProps.length > 0) && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button 
                        onClick={() => setIsCompareModalOpen(true)}
                        disabled={isCompareDisabled}
                        style={{...styles.formButton, marginTop: 0, ...(isCompareDisabled && styles.compareButtonDisabled)}}>
                        Compare Selected ({propertiesToCompare.length}/2)
                    </button>
                </div>
            )}
            
            {savedSaleProps.length === 0 && savedRentProps.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#4A5568', fontSize: '1.1rem', marginTop: '2rem' }}>
                    You haven't saved any properties yet. Start browsing to find your favorites!
                </p>
            ) : (
                <div style={styles.listingsGrid}>
                    {savedSaleProps.map(prop => (
                        <PropertyCard 
                            key={prop.id} 
                            property={prop} 
                            onViewDetails={() => onViewDetails(prop)}
                            isSaved={true}
                            onToggleSave={onToggleSave}
                            userRole="customer" // Simplified view on saved page
                            onEdit={() => {}} 
                            onDelete={() => {}}
                            showCompareCheckbox={true}
                            isCompared={propertiesToCompare.includes(prop.id)}
                            onToggleCompare={handleToggleCompare}
                        />
                    ))}
                    {savedRentProps.map(prop => (
                        <RentalPropertyCard 
                            key={prop.id} 
                            property={prop} 
                            onViewDetails={() => onViewDetails(prop)}
                            isSaved={true}
                            onToggleSave={onToggleSave}
                            showCompareCheckbox={true}
                            isCompared={propertiesToCompare.includes(prop.id)}
                            onToggleCompare={handleToggleCompare}
                            userRole="customer"
                            onEdit={() => {}}
                            onDelete={() => {}}
                        />
                    ))}
                </div>
            )}
            <CompareModal 
                isOpen={isCompareModalOpen}
                onClose={() => {
                    setIsCompareModalOpen(false);
                    setPropertiesToCompare([]); // Reset on close
                }}
                properties={getPropertiesForModal()}
            />
        </main>
    );
};

const App = () => {
  const [mainPage, setMainPage] = useState('home'); // 'home', 'properties', 'rent', 'saved'
  const [properties, setProperties] = useState(initialProperties);
  const [rentals, setRentals] = useState(initialRentals);
  const [userRole, setUserRole] = useState('customer'); // 'customer' or 'admin'
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<(Property | RentalProperty) | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<(Property | RentalProperty) | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [savedProperties, setSavedProperties] = useState<number[]>([]);
  const listingsRef = useRef<HTMLElement>(null);
  const [activeFilters, setActiveFilters] = useState({
      type: 'all',
      beds: 'any',
      baths: 'any',
      minPrice: '',
      maxPrice: '',
  });

  const handleToggleSave = (propertyId: number) => {
      setSavedProperties(prev => 
          prev.includes(propertyId) 
          ? prev.filter(id => id !== propertyId) 
          : [...prev, propertyId]
      );
  };

  const handleSaveListing = (listingData) => {
    const isRental = 'rent' in listingData;

    if (isRental) {
        if (listingData.id) { // Editing existing rental
            setRentals(prev => prev.map(r => r.id === listingData.id ? { ...r, ...listingData } : r));
        } else { // Adding new rental
            setRentals(prev => [...prev, { ...listingData, id: Date.now() }]);
        }
    } else { // It's a sale property
        if (listingData.id) { // Editing existing sale property
            setProperties(prev => prev.map(p => p.id === listingData.id ? { ...p, ...listingData } : p));
        } else { // Adding new sale property
            setProperties(prev => [...prev, { ...listingData, id: Date.now() }]);
        }
    }
    
    setIsFormModalOpen(false);
    setEditingListing(null);
  };
  
  const handleEditClick = (property: Property) => {
      setEditingListing(property);
      setIsFormModalOpen(true);
  };
  
  const handleDeleteProperty = (propertyId: number) => {
      if(window.confirm('Are you sure you want to delete this property?')) {
          setProperties(prev => prev.filter(p => p.id !== propertyId));
      }
  };

  const handleEditRental = (rental: RentalProperty) => {
      setEditingListing(rental);
      setIsFormModalOpen(true);
  };

  const handleDeleteRental = (rentalId: number) => {
      if(window.confirm('Are you sure you want to delete this rental property?')) {
          setRentals(prev => prev.filter(r => r.id !== rentalId));
      }
  };

  const handleViewDetails = (propertyToView: Property | RentalProperty) => {
      const isSaleProperty = 'price' in propertyToView;
      if (isSaleProperty) {
          setProperties(prev => prev.map(p => 
              p.id === propertyToView.id ? { ...p, viewCount: p.viewCount + 1 } : p
          ));
      } else {
          setRentals(prev => prev.map(r =>
              r.id === propertyToView.id ? { ...r, viewCount: r.viewCount + 1 } : r
          ));
      }
      setSelectedProperty(propertyToView);
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
  
  const handleApplyFilters = (filters) => {
      setActiveFilters(filters);
  };
  
  const handleResetFilters = () => {
       setActiveFilters({
          type: 'all',
          beds: 'any',
          baths: 'any',
          minPrice: '',
          maxPrice: '',
      });
  };

  const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (passwordInput === 'admin123') {
          setUserRole('admin');
          setIsPasswordModalOpen(false);
      } else {
          setPasswordError('Incorrect password. Please try again.');
      }
  };
  
  const filteredProperties = properties.filter(property => {
      const searchMatch = activeSearch === '' || 
        property.address.toLowerCase().includes(activeSearch.toLowerCase());
    
      const typeMatch = activeFilters.type === 'all' || property.type === activeFilters.type;
      const bedsMatch = activeFilters.beds === 'any' || property.beds >= parseInt(activeFilters.beds, 10);
      const bathsMatch = activeFilters.baths === 'any' || property.baths >= parseInt(activeFilters.baths, 10);
      const minPriceMatch = activeFilters.minPrice === '' || parseInt(property.price, 10) >= parseInt(activeFilters.minPrice, 10);
      const maxPriceMatch = activeFilters.maxPrice === '' || parseInt(property.price, 10) <= parseInt(activeFilters.maxPrice, 10);

      return searchMatch && typeMatch && bedsMatch && bathsMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <>
      <Header 
        userRole={userRole} 
        onRoleChange={handleRoleChange}
        onAddPropertyClick={() => { setEditingListing(null); setIsFormModalOpen(true); }}
        onNavigate={setMainPage}
        savedCount={savedProperties.length}
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
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            userRole={userRole}
            onEdit={handleEditClick}
            onDelete={handleDeleteProperty}
            savedProperties={savedProperties}
            onToggleSave={handleToggleSave}
          />
        </>
      )}

      {mainPage === 'rent' && 
        <RentPage 
            rentals={rentals}
            savedProperties={savedProperties} 
            onToggleSave={handleToggleSave}
            userRole={userRole}
            onEdit={handleEditRental}
            onDelete={handleDeleteRental}
            onViewDetails={handleViewDetails}
        />}
      
      {mainPage === 'saved' && (
        <SavedPropertiesPage
            allProperties={properties}
            allRentals={rentals}
            savedIds={savedProperties}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
        />
      )}

      <Footer />
      <PropertyFormModal 
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setEditingListing(null); }}
        onSave={handleSaveListing}
        listingToEdit={editingListing}
      />
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedProperties.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
      />
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
};


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
