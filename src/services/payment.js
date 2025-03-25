// payment process function
import PaystackPop from '@paystack/inline-js';

const publicKey = "pk_test_fbc43564cb7f496b0a15daee67833b1d35adaa88";

/**
 * Process payment using Paystack
 * @param {Object} paymentData - Payment information
 * @param {number} paymentData.amount - Amount in Naira
 * @param {string} paymentData.email - Customer email
 * @param {string} paymentData.reference - Unique transaction reference
 * @param {Function} paymentData.onSuccess - Success callback function
 * @param {Function} paymentData.onClose - Close callback function
 */
export const processPayment = (paymentData) => {
  const paystack = new PaystackPop();
  
  paystack.newTransaction({
    key: publicKey,
    amount: paymentData.amount * 100, // Convert to kobo
    email: paymentData.email,
    reference: paymentData.reference || generateReference(),
    metadata: {
      custom_fields: [
        {
          display_name: "Event Name",
          variable_name: "event_name",
          value: paymentData.eventName || "Event Ticket"
        },
        {
          display_name: "Ticket Type",
          variable_name: "ticket_type",
          value: paymentData.ticketType || "Standard"
        },
        {
          display_name: "Quantity",
          variable_name: "quantity",
          value: paymentData.quantity || "1"
        }
      ]
    },
    onSuccess: (transaction) => {
      if (paymentData.onSuccess) {
        paymentData.onSuccess(transaction);
      }
    },
    onCancel: () => {
      if (paymentData.onClose) {
        paymentData.onClose();
      }
    }
  });
};

/**
 * Generate a unique reference for the transaction
 */
export const generateReference = () => {
  const date = new Date();
  return `PLUG-${date.getTime()}-${Math.floor(Math.random() * 1000000)}`;
};
