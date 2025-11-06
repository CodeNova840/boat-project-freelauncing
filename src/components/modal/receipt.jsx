import { useRef, useState } from "react";
import { jsPDF } from 'jspdf';

const ReceiptModal = ({setShowReceipt,selectedItems,totals}) => {
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

  const formatCurrency = (amount) => {
    // Round to nearest cent for retail users
    const roundedAmount = isDealer ? amount : Math.round(amount * 100) / 100;
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(roundedAmount);
  };

  const downloadPDF = () => {
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
      // Round RRP total for retail users
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
        // Round RRP for retail users
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

  // Get the display price based on role - round RRP for retail
  const getDisplayPrice = (item) => {
    if (isDealer) {
      return item.dealerGST || 0;
    } else {
      return Math.round(item.rrpInGST * 100) / 100;
    }
  };

  // Get the total display price based on role - round RRP total for retail
  const getDisplayTotal = () => {
    if (isDealer) {
      return totals.totalDealerPrice || totals.totalRRP;
    } else {
      return Math.round(totals.totalRRP * 100) / 100;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Customer Quote</h2>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Information Form */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Receipt Content */}
            <div ref={receiptRef} className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">CUSTOMER QUOTE</h1>
                <p className="text-gray-600">Quote Date: {new Date().toLocaleDateString()}</p>
                {isDealer && (
                  <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Dealer View
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800">{userInfo.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-gray-800">{userInfo.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Phone:</span>
                    <p className="text-gray-800">{userInfo.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Quote Summary</h3>
                <div className={`grid gap-4 ${isDealer ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Total Items</div>
                    <div className="text-xl font-bold text-gray-800">{selectedItems.length}</div>
                  </div>
                  
                  {isDealer && (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-600">Dealer Margin</div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatCurrency(totals.totalMargin || 0)}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="text-sm text-purple-600">Dealer Price (GST)</div>
                        <div className="text-xl font-bold text-purple-600">
                          {formatCurrency(totals.totalDealerPrice || 0)}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600">Total Price</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(getDisplayTotal())}
                    </div>
                    <div className="text-xs text-green-500 mt-1">including GST</div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Item</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Code</th>
                        {isDealer && (
                          <>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Dealer Margin</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Dealer Price</th>
                          </>
                        )}
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          {isDealer ? 'Customer Price' : 'Price'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((item, index) => (
                        <tr key={item.code} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-300 px-4 py-3 text-gray-800">{item.name}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-800">{item.code}</td>
                          {isDealer && (
                            <>
                              <td className="border border-gray-300 px-4 py-3 text-blue-600 font-semibold">
                                {formatCurrency(item.dealerMargin || 0)}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-purple-600 font-semibold">
                                {formatCurrency(item.dealerPriceInGST || 0)}
                              </td>
                            </>
                          )}
                          <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">
                            {formatCurrency(getDisplayPrice(item))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-green-900">Quote Total</h3>
                    <p className="text-sm text-green-700">All prices include GST</p>
                    {isDealer && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-blue-700">Dealer Margin: {formatCurrency(totals.totalMargin || 0)}</p>
                        <p className="text-sm text-purple-700">Dealer Price: {formatCurrency(totals.totalDealerPrice || 0)}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-900">
                      {formatCurrency(getDisplayTotal())}
                    </div>
                    {isDealer && (
                      <p className="text-sm text-green-700 mt-1">Customer Price</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">Thank you for your interest in IRON Boats!</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={downloadPDF}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReceiptModal