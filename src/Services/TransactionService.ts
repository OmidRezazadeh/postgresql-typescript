import { TransactionRepository } from "../Repositories/TransactionRepository";
import Transaction from "../models/transaction";
 import { ZarinPal } from "../payment/ZarinpalGateway";
import { Zibal } from "../payment/ZibalGateway";
// TransactionService is responsible for handling transactions, including processing payments and storing transaction data.
export class TransactionService {
  // The TransactionRepository is used to interact with the transaction data in the database.
  private transactionRepository: TransactionRepository;

  // The constructor injects the TransactionRepository dependency.
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  // The pay method initiates the payment process using the payZibal utility.
  async pay(cart: any) {
      let type=Transaction.PAYMENT_GATEWAY_TYPE_ZIBAL;
    if ( type === Transaction.PAYMENT_GATEWAY_TYPE_ZIBAL ) {
      const zibalGateway = new Zibal();
     return  zibalGateway.processPayment(cart);
       
   }else if ( type === Transaction.PAYMENT_GATEWAY_TYPE_ZARINPAL ){
    
    const zirinpalGatewa = new ZarinPal();
   return zirinpalGatewa.processPayment(cart);
  
   }
  
  }

  // The store method saves the transaction details in the database, including userId, payment response, and cart information.
  async store(userId: number, response: any, cart: any) {
    return await this.transactionRepository.store(userId, response, cart);
  }

  // The processTransaction method handles the outcome of the transaction based on the payment code and payment status.
  async processTransaction(paymentCode: any, paymentStatus: any) {
    let message;
    try {
      // Retrieve transaction data from the database using the payment code.
      const transactionData = await this.transactionRepository.find(paymentCode);

      if (transactionData) {
        const transactionId = transactionData.id;

        // If the payment status indicates failure (e.g., "3"), mark the transaction as failed in the database.
        if (paymentStatus === "3") {
          await this.transactionRepository.failed(transactionId);
        }

        // If the payment status indicates success (e.g., "2"), mark the transaction as successful in the database.
        if (paymentStatus === "2") {
          console.log("paymentStatus");
          await this.transactionRepository.success(transactionId);
          message = "پرداخت موفق"; // "Payment successful" message in Persian
        }
      }

      return message;
    } catch (error) {
      // Log any errors that occur during the transaction process.
      console.log(error);
    }
  }
}
