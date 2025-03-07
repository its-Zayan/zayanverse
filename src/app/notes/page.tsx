"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Download, FileText, Search, Filter, Star, ShoppingCart, Lock, CheckCircle, CreditCard, Smartphone, Wallet, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PaymentPage from '@/components/payment/PaymentPage';
import PaymentSuccess from '@/components/payment/PaymentSuccess';

type Product = {
  id: string;
  title: string;
  type: string;
  subject: string;
  level: string;
  rating: number;
  reviews: number;
  description: string;
  price: number;
  preview: string;
  coverImage: string;
  thumbnail: {
    src: string;
    alt: string;
    overlay: {
      text: string;
      color: string;
    };
  };
  features: string[];
  chapters?: string[];
};

type PaymentMethod = 'card' | 'jazzcash' | 'easypaisa' | 'bank';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const SUBJECT_BACKGROUNDS = {
  history: "/images/history-bg.jpg"
};

const products: Product[] = [
  {
    id: "hist_caie_s1",
    title: 'O-Level History Section 1 Complete Notes',
    type: 'Notes',
    subject: 'History',
    level: 'O-Level',
    rating: 4.9,
    reviews: 78,
    description: 'Comprehensive CAIE O-Level History Section 1 notes covering all 6 chapters with possible questions, bullet points, and detailed explanations.',
    price: 34.99,
    preview: '/previews/history-preview.pdf',
    coverImage: '/images/history-cover.jpg',
    thumbnail: {
      src: SUBJECT_BACKGROUNDS.history,
      alt: 'CAIE O-Level History Section 1 Notes Cover',
      overlay: {
        text: 'Based on Nigel Kelly',
        color: 'bg-gradient-to-t from-black/90 to-black/20'
      }
    },
    features: [
      'Complete 6 chapters coverage',
      'Possible exam questions with answers',
      'Bullet-point summaries',
      'Easy-to-understand explanations',
      'Based on latest syllabus',
      'Includes key points from Nigel Kelly'
    ],
    chapters: [
      'Chapter 1: Were the peace treaties of 1919–23 fair?',
      'Chapter 2: To what extent was the League of Nations a success?',
      'Chapter 3: Why had international peace collapsed by 1939?',
      'Chapter 4: Who was to blame for the Cold War?',
      'Chapter 5: How effectively did the USA contain communism?',
      "Chapter 6: How secure was the USSR's control over Eastern Europe?"
    ]
  }
];

const categories = ['All', 'O-Level', 'A-Level'];
const subjects = ['All', 'History', 'Mathematics', 'Physics', 'Chemistry'];
const types = ['All', 'Notes', 'Past Papers', 'E-Books'];

const reviews = [
  {
    id: 1,
    name: "Dr. Sarah Thompson",
    title: "History Department Head, Cambridge International School",
    rating: 5,
    date: "March 2024",
    comment: "These notes perfectly align with the CAIE O-Level syllabus. While some diagrams could be clearer, the content is excellent. The Cold War section is particularly well-structured.",
    verified: true
  },
  {
    id: 2,
    name: "James Chen",
    title: "Top Scorer, CAIE O-Level History (2023)",
    rating: 4,
    date: "February 2024",
    comment: "Achieved an A* with these notes. The practice questions were invaluable, though I wish there were more model answers for Paper 2. Still, definitely worth the investment.",
    verified: true
  },
  {
    id: 3,
    name: "Prof. Michael Roberts",
    title: "Educational Consultant, CAIE",
    rating: 5,
    date: "January 2024",
    comment: "An excellent resource that covers all aspects of Section 1. The bullet-point format works well, though some students might need additional context for certain topics.",
    verified: true
  },
  {
    id: 4,
    name: "Emily Parker",
    title: "History Teacher, International School of London",
    rating: 4,
    date: "March 2024",
    comment: "My students have shown marked improvement using these notes. The chapter summaries are concise, though the League of Nations section could use more detail.",
    verified: true
  },
  {
    id: 5,
    name: "David Wong",
    title: "O-Level Student",
    rating: 5,
    date: "February 2024",
    comment: "These notes helped me understand complex topics easily. The timeline diagrams are especially helpful. Would definitely recommend to other students!",
    verified: true
  }
];

// Secure link delivery function
const deliverSecureLink = async (productId: string, transactionId: string) => {
  try {
    const response = await fetch('/api/secure-delivery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        transactionId,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) throw new Error('Delivery failed');
    
    const data = await response.json();
    return data.downloadUrl;
  } catch (error) {
    console.error('Error delivering content:', error);
    throw error;
  }
};

// Move PaymentModal component definition here, before NotesPage
const PaymentModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    email: '',
    accountNumber: ''
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async (method: PaymentMethod) => {
    setPaymentMethod(method);
    setPaymentStatus('processing');
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get secure download link
      const downloadUrl = await deliverSecureLink(product.id, transactionId);
      
      setPaymentStatus('success');
      
      // After 2 seconds of showing success, redirect to download page
      setTimeout(() => {
        router.push(`/download?url=${encodeURIComponent(downloadUrl)}`);
        onClose();
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
      setPaymentStatus('error');
    }
  };

  const getPaymentForm = () => {
    switch(paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="CVC"
                className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'jazzcash':
      case 'easypaisa':
        return (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="Phone Number"
              value={paymentDetails.phoneNumber}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-400">
              You will receive an MPIN request on this number
            </p>
          </div>
        );
      
      case 'bank':
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Bank Account Details</h4>
              <p className="text-sm text-gray-400">Account Title: ZayanVerse Education</p>
              <p className="text-sm text-gray-400">Account Number: 1234-5678-9012-3456</p>
              <p className="text-sm text-gray-400">Bank: HBL</p>
            </div>
            <input
              type="text"
              placeholder="Your Account Number"
              value={paymentDetails.accountNumber}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={paymentDetails.email}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {paymentStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-gray-400">Redirecting to download page...</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4">
              {/* Credit/Debit Card Option */}
              <button 
                onClick={() => !paymentMethod && handlePayment('card')}
                disabled={paymentStatus === 'processing'}
                className={`w-full ${
                  paymentMethod === 'card' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-blue-500/70 to-blue-600/70 hover:from-blue-500 hover:to-blue-600'
                } text-white p-4 rounded-lg flex items-center gap-4 transition-all ${
                  paymentStatus === 'processing' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Credit/Debit Card</div>
                  <div className="text-sm text-blue-200">Visa, Mastercard, UnionPay</div>
                </div>
              </button>

              {/* JazzCash Option */}
              <button 
                onClick={() => !paymentMethod && handlePayment('jazzcash')}
                disabled={paymentStatus === 'processing'}
                className={`w-full ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                    : 'bg-gradient-to-r from-red-500/70 to-red-600/70 hover:from-red-500 hover:to-red-600'
                } text-white p-4 rounded-lg flex items-center gap-4 transition-all ${
                  paymentStatus === 'processing' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">JazzCash</div>
                  <div className="text-sm text-red-200">Mobile Wallet & MPIN</div>
                </div>
              </button>

              {/* EasyPaisa Option */}
              <button 
                onClick={() => !paymentMethod && handlePayment('easypaisa')}
                disabled={paymentStatus === 'processing'}
                className={`w-full ${
                  paymentMethod === 'easypaisa'
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-green-500/70 to-green-600/70 hover:from-green-500 hover:to-green-600'
                } text-white p-4 rounded-lg flex items-center gap-4 transition-all ${
                  paymentStatus === 'processing' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">EasyPaisa</div>
                  <div className="text-sm text-green-200">Mobile Wallet & MPIN</div>
                </div>
              </button>

              {/* Bank Transfer Option */}
              <button 
                onClick={() => !paymentMethod && handlePayment('bank')}
                disabled={paymentStatus === 'processing'}
                className={`w-full ${
                  paymentMethod === 'bank'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                    : 'bg-gradient-to-r from-purple-500/70 to-purple-600/70 hover:from-purple-500 hover:to-purple-600'
                } text-white p-4 rounded-lg flex items-center gap-4 transition-all ${
                  paymentStatus === 'processing' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Bank Transfer</div>
                  <div className="text-sm text-purple-200">Direct Bank Payment</div>
                </div>
              </button>
            </div>

            {paymentMethod && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                {getPaymentForm()}
              </motion.div>
            )}

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-400">Total Amount:</div>
                <div className="text-2xl font-bold">${product.price}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onClose}
                  disabled={paymentStatus === 'processing'}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                {paymentMethod && (
                  <button
                    onClick={() => handlePayment(paymentMethod)}
                    disabled={paymentStatus === 'processing'}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentStatus === 'processing' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay Now
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [purchaseStatus, setPurchaseStatus] = useState<{[key: string]: 'idle' | 'processing' | 'completed' | 'error'}>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'payment' | 'success'>('idle');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const router = useRouter();

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.level === selectedCategory;
    const subjectMatch = selectedSubject === 'All' || product.subject === selectedSubject;
    const typeMatch = selectedType === 'All' || product.type === selectedType;
    return categoryMatch && subjectMatch && typeMatch;
  });

  // Auto-rotate reviews
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
    setPaymentStep('payment');
  };

  const handlePaymentSuccess = (txnId: string) => {
    setTransactionId(txnId);
    setPaymentStep('success');
  };

  const handlePaymentCancel = () => {
    setPaymentStep('idle');
    setSelectedProduct(null);
  };

  if (paymentStep === 'payment' && selectedProduct) {
    return (
      <PaymentPage
        productId={selectedProduct.id}
        productName={selectedProduct.title}
        amount={selectedProduct.price}
        onSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    );
  }

  if (paymentStep === 'success' && selectedProduct && transactionId) {
    return (
      <PaymentSuccess
        transactionId={transactionId}
        productName={selectedProduct.title}
        downloadUrl={`/api/download/${selectedProduct.id}?txn=${transactionId}`}
      />
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Premium Notes & E-Books
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            High-quality study materials crafted by top achievers. Boost your academic performance with our comprehensive guides.
          </p>
        </motion.div>

        {/* Filters Section */}
        <div className="mb-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Category</label>
              <select 
                className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-900">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Subject</label>
              <select 
                className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject} className="bg-gray-900">
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Type</label>
              <select 
                className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type} value={type} className="bg-gray-900">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group overflow-hidden">
                  {product.thumbnail && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 z-10" />
                      <Image
                        src={product.thumbnail.src}
                        alt={product.thumbnail.alt}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ 
                          pointerEvents: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                          userSelect: 'none'
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                      {product.thumbnail.overlay && (
                        <div className={`absolute bottom-0 left-0 right-0 ${product.thumbnail.overlay.color} text-white text-sm py-2 px-4 backdrop-blur-sm z-20`}>
                          {product.thumbnail.overlay.text}
                        </div>
                      )}
                    </>
                  )}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm z-30">
                    {product.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Chapters if available */}
                  {product.chapters && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Chapters Included:</h4>
                      <ul className="space-y-1">
                        {product.chapters.slice(0, 3).map((chapter, index) => (
                          <li key={index} className="text-sm text-gray-400">
                            • {chapter}
                          </li>
                        ))}
                        {product.chapters.length > 3 && (
                          <li className="text-sm text-blue-400">
                            + {product.chapters.length - 3} more chapters
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-white">${product.price}</div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">Secure Delivery</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handlePurchase(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Buy Now
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Preview Sample
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubject('All');
                setSelectedType('All');
              }}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
            <div className="flex gap-4 animate-scroll will-change-transform">
              {[...reviews, ...reviews, ...reviews].map((review, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[350px] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform-gpu"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/30 to-purple-500/30">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-400">
                        {review.name[0]}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{review.name}</h3>
                      <p className="text-xs text-gray-400">{review.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">• {review.date}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-green-500 text-xs">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs italic line-clamp-3">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <style jsx global>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${(reviews.length * 100) / 3}%);
            }
          }
          
          .animate-scroll {
            animation: scroll 15s linear infinite;
            animation-fill-mode: forwards;
            will-change: transform;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation: none;
            }
          }
        `}</style>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-gray-300">Happy Students</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold mb-2">4.8/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 