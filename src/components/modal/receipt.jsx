import { useRef, useState } from "react";
import { jsPDF } from 'jspdf';

const ReceiptModal = ({setShowReceipt,selectedItems,totals,selectedDisplay}) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const receiptRef = useRef();
  
  const role = localStorage.getItem("role");
  const isDealer = role === 'dealer';
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showToast = (message, type = 'error') => {
    // Check if toastr is available (you might need to import toastr or use another notification library)
    if (typeof toastr !== 'undefined') {
      toastr[type](message);
    } else {
      // Fallback to browser alert if toastr is not available
      toastr.error(message);
    }
  };

  const validateUserInfo = () => {
    const { name, email, phoneNumber } = userInfo;
    
    if (!name.trim()) {
      showToast('Name is required');
      return false;
    }
    
    if (!email.trim()) {
      showToast('Email is required');
      return false;
    }
    
    if (!phoneNumber.trim()) {
      showToast('Phone number is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address');
      return false;
    }
    
    // Basic phone number validation (at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      showToast('Please enter a valid phone number (at least 10 digits)');
      return false;
    }
    
    return true;
  };

  const formatCurrency = (amount) => {
    const roundedAmount = isDealer ? amount : Math.round(amount * 100) / 100;
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(roundedAmount);
  };

  const downloadPDF = () => {
    // Validate user info before downloading
    if (!validateUserInfo()) {
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text('CUSTOMER QUOTE', pageWidth / 2, 20, { align: 'center' });
    
    // Add user info
    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text('Customer Information:', 20, 40);
    doc.setTextColor(33, 37, 41);
    doc.text(`Name: ${userInfo.name || 'N/A'}`, 20, 47);
    doc.text(`Email: ${userInfo.email || 'N/A'}`, 20, 54);
    doc.text(`Phone: ${userInfo.phoneNumber || 'N/A'}`, 20, 61);
    
    // Add order summary on the right side
    const summaryX = pageWidth - 80;
    doc.setTextColor(108, 117, 125);
    doc.text('Quote Summary:', summaryX, 40);
    doc.setTextColor(33, 37, 41);
    doc.text(`Items: ${selectedItems.length}`, summaryX, 47);
    
    // For retail users, only show RRP total
    if (isDealer) {
      doc.text(`Dealer Margin: ${formatCurrency(totals.dealerMargin || 0)}`, summaryX, 54);
      doc.text(`Dealer GST: ${formatCurrency(totals.totalDealerPrice || 0)}`, summaryX, 61);
      doc.setFont(undefined, 'bold');
      doc.text(`Total: ${formatCurrency(totals.totalDealerPrice || totals.totalRRP)}`, summaryX, 68);
    } else {
      doc.setFont(undefined, 'bold');
      const roundedTotal = Math.round(totals.totalRRP * 100) / 100;
      doc.text(`Total: ${formatCurrency(roundedTotal)}`, summaryX, 54);
    }
    doc.setFont(undefined, 'normal');
    
    // Add items table
    let yPosition = isDealer ? 100 : 90;
    
    // Table headers - only show item, code, and price for retail
    const columns = isDealer ? [
      { header: 'Item', x: 20, width: 100 },
      { header: 'Code', x: 130, width: 40 },
      { header: 'Margin', x: 180, width: 40 },
      { header: 'Price', x: 230, width: 50 },
    ] : [
      { header: 'Item', x: 20, width: 140 },
      { header: 'Code', x: 170, width: 40 },
      { header: 'Price', x: 220, width: 50 },
    ];
    
    // Draw table header
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
    doc.setTextColor(33, 37, 41);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    
    columns.forEach(col => {
      doc.text(col.header, col.x, yPosition + 5);
    });
    
    yPosition += 8;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    
    // Table rows
    selectedItems.forEach((item, index) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        yPosition = 20;
        
        doc.setFillColor(248, 249, 250);
        doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
        doc.setTextColor(33, 37, 41);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        
        columns.forEach(col => {
          doc.text(col.header, col.x, yPosition + 5);
        });
        
        yPosition += 8;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
      }
      
      // Item name with text wrapping
      const itemNameLines = doc.splitTextToSize(item.name, columns[0].width - 5);
      const lineHeight = 4;
      
      const rowHeight = Math.max(
        itemNameLines.length * lineHeight,
        lineHeight + 2
      );
      
      itemNameLines.forEach((line, lineIndex) => {
        doc.text(line, columns[0].x, yPosition + 3 + (lineIndex * lineHeight));
      });
      
      doc.text(item.code, columns[1].x, yPosition + 3);
      
      if (isDealer) {
        doc.text(formatCurrency(item.dealerMargin || 0), columns[2].x, yPosition + 3);
        doc.text(formatCurrency(item.dealerGST || 0), columns[3].x, yPosition + 3);
      } else {
        const roundedRRP = Math.round(item.rrpInGST * 100) / 100;
        doc.text(formatCurrency(roundedRRP), columns[2].x, yPosition + 3);
      }
      
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition + rowHeight, pageWidth - 20, yPosition + rowHeight);
      
      yPosition += rowHeight + 2;
    });
    
    // Add footer
    const finalY = Math.min(yPosition + 15, pageHeight - 10);
    doc.setTextColor(108, 117, 125);
    doc.setFontSize(10);
    doc.text('Thank you for your interest in IRON Boats!', pageWidth / 2, finalY, { align: 'center' });
    
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
    }
    
    doc.save('quote.pdf');
  };

  const getDisplayPrice = (item) => {
    if (isDealer) {
      return item.rrpInGST || 0;
    } else {
      return Math.round(item.rrpInGST * 100) / 100;
    }
  };

  const getDisplayTotal = () => {
    if (isDealer) {
      return totals.totalDealerPrice || totals.totalRRP;
    } else {
      return Math.round(totals.totalRRP * 100) / 100;
    }
  };

  // Check if all required fields are filled
  const isDownloadDisabled = () => {
    const { name, email, phoneNumber } = userInfo;
    return !name.trim() || !email.trim() || !phoneNumber.trim();
  };

  const handleDownloadClick = () => {
    if (isDownloadDisabled()) {
      showToast('Please fill in all required fields (name, email, and phone number) before downloading');
      return;
    }
    downloadPDF();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Customer Quote</h2>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Information Form */}
            <div className="mb-6 p-4 sm:p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p><span className="text-red-500">*</span> Required fields</p>
              </div>
            </div>

            {/* Receipt Content */}
            <div ref={receiptRef} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b border-gray-200">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">CUSTOMER QUOTE</h1>
                <p className="text-sm sm:text-base text-gray-600">Quote Date: {new Date().toLocaleDateString()}</p>
                {isDealer && (
                  <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Dealer View
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800 break-words">{userInfo.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-gray-800 break-words">{userInfo.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Phone:</span>
                    <p className="text-gray-800 break-words">{userInfo.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">Quote Summary</h3>
                <div className={`grid gap-3 ${isDealer ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'}`}>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600">Total Items</div>
                    <div className="text-lg sm:text-xl font-bold text-gray-800">{selectedItems.length}</div>
                  </div>
                  
                  {isDealer && (
                    <>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="text-xs sm:text-sm text-blue-600">Dealer Margin</div>
                        <div className="text-lg sm:text-xl font-bold text-blue-600">
                          {formatCurrency(totals.totalMargin || 0)}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <div className="text-xs sm:text-sm text-purple-600">Dealer Price (GST)</div>
                        <div className="text-lg sm:text-xl font-bold text-purple-600">
                          {formatCurrency(totals.totalDealerPrice || 0)}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="text-xs sm:text-sm text-green-600">Total Price</div>
                    <div className="text-lg sm:text-xl font-bold text-green-600">
                      {formatCurrency(getDisplayTotal())}
                    </div>
                    <div className="text-xs text-green-500 mt-1">including GST</div>
                  </div>
                </div>
              </div>

              {/* Items Table - Responsive */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">{selectedDisplay? selectedDisplay:"Items"}</h3>
                <div className="overflow-x-auto">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      {/* Desktop Table */}
                      <table className="min-w-full border-collapse border border-gray-300 hidden sm:table">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 text-sm">Item</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 text-sm">Code</th>
                            {isDealer && (
                              <>
                                <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 text-sm">Dealer Margin</th>
                                <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 text-sm">Dealer Price</th>
                              </>
                            )}
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 text-sm">
                              {isDealer ? 'Customer Price' : 'Price'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedItems.map((item, index) => (
                            <tr key={item.code} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="border border-gray-300 px-3 py-2 text-gray-800 text-sm">{item.name}</td>
                              <td className="border border-gray-300 px-3 py-2 text-gray-800 text-sm">{item.code}</td>
                              {isDealer && (
                                <>
                                  <td className="border border-gray-300 px-3 py-2 text-blue-600 font-semibold text-sm">
                                    {formatCurrency(item.dealerMargin || 0)}
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-purple-600 font-semibold text-sm">
                                    {formatCurrency(item.dealerPriceInGST || 0)}
                                  </td>
                                </>
                              )}
                              <td className="border border-gray-300 px-3 py-2 text-green-600 font-semibold text-sm">
                                {formatCurrency(getDisplayPrice(item))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Mobile Cards */}
                      <div className="sm:hidden space-y-3">
                        {selectedItems.map((item, index) => (
                          <div key={item.code} className="border border-gray-300 rounded-lg p-3 bg-white">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="col-span-2">
                                <span className="font-semibold text-gray-700">Item:</span>
                                <p className="text-gray-800 mt-1">{item.name}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Code:</span>
                                <p className="text-gray-800">{item.code}</p>
                              </div>
                              {isDealer && (
                                <>
                                  <div>
                                    <span className="font-semibold text-blue-600">Margin:</span>
                                    <p className="text-blue-600">{formatCurrency(item.dealerMargin || 0)}</p>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-purple-600">Dealer Price:</span>
                                    <p className="text-purple-600">{formatCurrency(item.dealerPriceInGST || 0)}</p>
                                  </div>
                                </>
                              )}
                              <div className={isDealer ? 'col-span-2' : ''}>
                                <span className="font-semibold text-green-600">
                                  {isDealer ? 'Customer Price:' : 'Price:'}
                                </span>
                                <p className="text-green-600 font-semibold">{formatCurrency(getDisplayPrice(item))}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-green-900">Quote Total</h3>
                    <p className="text-xs sm:text-sm text-green-700">All prices include GST</p>
                    {isDealer && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs sm:text-sm text-blue-700">Dealer Margin: {formatCurrency(totals.totalMargin || 0)}</p>
                        <p className="text-xs sm:text-sm text-purple-700">Dealer Price: {formatCurrency(totals.totalDealerPrice || 0)}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-3xl font-bold text-green-900">
                      {formatCurrency(getDisplayTotal())}
                    </div>
                    {isDealer && (
                      <p className="text-xs sm:text-sm text-green-700 mt-1">Customer Price</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm sm:text-base text-gray-600">Thank you for your interest in IRON Boats!</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleDownloadClick}
                disabled={isDownloadDisabled()}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-colors duration-200 font-medium flex items-center text-sm sm:text-base w-full sm:w-auto justify-center ${
                  isDownloadDisabled() 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isDownloadDisabled() ? 'Fill Required Fields to Download' : 'Download PDF Quote'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReceiptModal