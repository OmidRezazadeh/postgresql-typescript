import { Request, Response, NextFunction } from 'express';

// Error handling middleware to handle errors in the application
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Setting status code based on the error status or defaulting to 500 (Internal Server Error)
    error.statusCode = error.status || 500;
    // Setting status to 'error' or using the provided status
    error.status = error.status || 'error';
    
    // Sending JSON response with error status code and message
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } catch (err) {
    // Handling errors that occur during error handling (meta, right?)
    console.error('Error in errorHandler while handling error:', err);
    
    // Sending a generic 500 (Internal Server Error) response if there's an issue in handling the error
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};