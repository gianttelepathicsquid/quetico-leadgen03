import React, { useState } from 'react';
import { 
  DollarSign, 
  Star, 
  Trophy,
  Package,
  Truck,
  Box,
  Send,
  AlertCircle,
  CheckCircle,
  Loader,
  Globe
} from 'lucide-react';

const LeadGenWidget = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    monthlyOrders: '',
    interests: [],
    platforms: [],
    shippingMethods: [],
    businessType: '',
    location: '',
    currentProvider: '',
    inventorySize: '',
    specialRequirements: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/11559545/2r2s2qn/';

  const options = {
    platforms: [
      'Shopify',
      'WooCommerce',
      'Magento',
      'Amazon',
      'Walmart',
      'eBay',
      'BigCommerce',
      'Custom Platform'
    ],
    interests: [
      'Warehousing',
      'Retail Fulfillment',
      'eCommerce Fulfillment',
      'Value-Added Services',
      'FTZ Services',
      'International Shipping'
    ],
    shippingMethods: [
      'Standard Ground',
      'Express',
      'International',
      'Freight',
      'Same-Day',
      'Custom Routing'
    ],
    businessTypes: [
      'B2C eCommerce',
      'B2B/Wholesale',
      'Retail Distribution',
      'Marketplace Seller',
      'Direct-to-Consumer Brand'
    ],
    orderVolumes: [
      '0-100',
      '101-500',
      '501-1000',
      '1001-5000',
      '5000+'
    ],
    inventorySizes: [
      '1-100 SKUs',
      '101-500 SKUs',
      '501-1000 SKUs',
      '1000+ SKUs'
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Quetico Lead Gen Widget'
        })
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        website: '',
        phone: '',
        monthlyOrders: '',
        interests: [],
        platforms: [],
        shippingMethods: [],
        businessType: '',
        location: '',
        currentProvider: '',
        inventorySize: '',
        specialRequirements: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Partner with Quetico 3PL</h2>
        <p className="text-gray-400">Tell us about your business needs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-3">Business Type</label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              required
            >
              <option value="">Select business type</option>
              {options.businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-3">Monthly Order Volume</label>
            <select
              value={formData.monthlyOrders}
              onChange={(e) => setFormData({...formData, monthlyOrders: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              required
            >
              <option value="">Select monthly volume</option>
              {options.orderVolumes.map(volume => (
                <option key={volume} value={volume}>{volume} orders/month</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-3">Inventory Size</label>
            <select
              value={formData.inventorySize}
              onChange={(e) => setFormData({...formData, inventorySize: e.target.value})}
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select inventory size</option>
              {options.inventorySizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Services & Platforms */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-3">Services of Interest</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {options.interests.map((interest) => (
                <label key={interest} className="flex items-center p-3 bg-slate-800 rounded hover:bg-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleMultiSelect('interests', interest)}
                    className="form-checkbox h-4 w-4 text-sky-500 border-slate-700 rounded"
                  />
                  <span className="ml-3 text-gray-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-3">eCommerce Platforms</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {options.platforms.map((platform) => (
                <label key={platform} className="flex items-center p-3 bg-slate-800 rounded hover:bg-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handleMultiSelect('platforms', platform)}
                    className="form-checkbox h-4 w-4 text-sky-500 border-slate-700 rounded"
                  />
                  <span className="ml-3 text-gray-300">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-3">Shipping Methods Needed</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {options.shippingMethods.map((method) => (
                <label key={method} className="flex items-center p-3 bg-slate-800 rounded hover:bg-slate-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.shippingMethods.includes(method)}
                    onChange={() => handleMultiSelect('shippingMethods', method)}
                    className="form-checkbox h-4 w-4 text-sky-500 border-slate-700 rounded"
                  />
                  <span className="ml-3 text-gray-300">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-gray-300 mb-2">Special Requirements</label>
          <textarea
            value={formData.specialRequirements}
            onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            rows={4}
            placeholder="Tell us about any special requirements or questions you have..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors ${
            loading 
              ? 'bg-slate-700 cursor-not-allowed' 
              : 'bg-sky-500 hover:bg-sky-600'
          }`}
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" size={20} />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2" size={20} />
              Request Information
            </>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="flex items-center text-green-400 bg-green-400/10 p-4 rounded-lg">
            <CheckCircle className="mr-2" size={20} />
            Thank you! A Quetico representative will contact you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center text-red-400 bg-red-400/10 p-4 rounded-lg">
            <AlertCircle className="mr-2" size={20} />
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default LeadGenWidget;
