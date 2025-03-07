"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PaymentSuccessProps {
  transactionId: string;
  productName: string;
  downloadUrl?: string;
}

export default function PaymentSuccess({ transactionId, productName, downloadUrl }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Product</div>
                <div className="font-medium text-gray-900">{productName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Transaction ID</div>
                <div className="font-medium text-gray-900">{transactionId}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {downloadUrl && (
              <Link
                href={downloadUrl}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Now
              </Link>
            )}
            
            <Link
              href="/notes"
              className="w-full bg-white text-gray-600 py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              Back to Notes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 