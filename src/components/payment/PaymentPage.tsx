"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Wallet, Building2, ArrowLeft, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PaymentMethod = 'card' | 'jazzcash' | 'easypaisa' | 'bank';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

interface PaymentPageProps {
  productId: string;
  productName: string;
  amount: number;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

export default function PaymentPage({ productId, productName, amount, onSuccess, onCancel }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    phoneNumber: '',
    email: '',
    accountNumber: '',
    cardholderName: '',
    country: 'Pakistan',
    addressLine1: '',
    addressLine2: '',
    suburb: '',
    city: '',
    postalCode: '',
    saveInfo: false
  });
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = () => {
    switch(selectedMethod) {
      case 'card':
        if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC || !formData.cardholderName) {
          setError('Please fill in all required fields');
          return false;
        }
        break;
      case 'jazzcash':
      case 'easypaisa':
        if (!formData.phoneNumber) {
          setError('Please enter your phone number');
          return false;
        }
        if (!/^03[0-9]{9}$/.test(formData.phoneNumber)) {
          setError('Please enter a valid Pakistani phone number');
          return false;
        }
        break;
      case 'bank':
        if (!formData.accountNumber || !formData.email) {
          setError('Please fill in all bank transfer details');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      onSuccess(transactionId);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">Secure Payment</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div className="space-y-3">
                {/* Credit Card */}
                <button
                  onClick={() => setSelectedMethod('card')}
                  className={`w-full p-4 rounded-lg border ${
                    selectedMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  } transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedMethod === 'card' ? 'bg-blue-500' : 'bg-gray-100 group-hover:bg-blue-500'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        selectedMethod === 'card' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, UnionPay</div>
                    </div>
                  </div>
                </button>

                {/* JazzCash */}
                <button
                  onClick={() => setSelectedMethod('jazzcash')}
                  className={`w-full p-4 rounded-lg border ${
                    selectedMethod === 'jazzcash'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                  } transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedMethod === 'jazzcash' ? 'bg-red-500' : 'bg-gray-100 group-hover:bg-red-500'
                    }`}>
                      <Smartphone className={`w-6 h-6 ${
                        selectedMethod === 'jazzcash' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">JazzCash</div>
                      <div className="text-sm text-gray-500">Mobile Wallet & MPIN</div>
                    </div>
                  </div>
                </button>

                {/* EasyPaisa */}
                <button
                  onClick={() => setSelectedMethod('easypaisa')}
                  className={`w-full p-4 rounded-lg border ${
                    selectedMethod === 'easypaisa'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                  } transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedMethod === 'easypaisa' ? 'bg-green-500' : 'bg-gray-100 group-hover:bg-green-500'
                    }`}>
                      <Wallet className={`w-6 h-6 ${
                        selectedMethod === 'easypaisa' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">EasyPaisa</div>
                      <div className="text-sm text-gray-500">Mobile Wallet & MPIN</div>
                    </div>
                  </div>
                </button>

                {/* Bank Transfer */}
                <button
                  onClick={() => setSelectedMethod('bank')}
                  className={`w-full p-4 rounded-lg border ${
                    selectedMethod === 'bank'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                  } transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedMethod === 'bank' ? 'bg-purple-500' : 'bg-gray-100 group-hover:bg-purple-500'
                    }`}>
                      <Building2 className={`w-6 h-6 ${
                        selectedMethod === 'bank' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Bank Transfer</div>
                      <div className="text-sm text-gray-500">Direct Bank Payment</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Payment Forms */}
              {selectedMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  {selectedMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={formData.cardCVC}
                            onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(selectedMethod === 'jazzcash' || selectedMethod === 'easypaisa') && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="03XX XXXXXXX"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        You will receive an MPIN request on this number
                      </p>
                    </div>
                  )}

                  {selectedMethod === 'bank' && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Bank Account Details</h4>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Account Title: ZayanVerse Education</p>
                          <p className="text-sm text-gray-600">Account Number: 1234-5678-9012-3456</p>
                          <p className="text-sm text-gray-600">Bank: HBL</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Account Number</label>
                        <input
                          type="text"
                          placeholder="Enter your account number"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <div className="font-medium text-gray-900">{productName}</div>
                  <div className="text-sm text-gray-500">Product ID: {productId}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">${amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Processing Fee</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${amount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  onClick={(e) => handleSubmit(e)}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium ${
                    !selectedMethod
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${amount.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 