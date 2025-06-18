export const errorHandler = (err, req, res, next) => {
  console.error('Error stack:', err.stack);

  // TypeORM specific errors
  if (err.name === 'QueryFailedError') {
    return res.status(400).json({
      success: false,
      error: 'Database query failed',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};