export class GlobalApiResponse {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    stack?: string;
  };
  statusCode?: number;
  private constructor({
    success,
    data,
    errorMessage,
    stack,
    statusCode,
  }: {
    success: boolean;
    data?: any;
    errorMessage?: string;
    stack?: string;
    statusCode?: number;
  }) {
    this.success = success;
    if (success) {
      this.data = data;
    } else {
      this.error = {
        message: errorMessage || 'An error occurred',
        stack: stack,
      };
      this.statusCode = statusCode || 500;
    }
  }

  static success(data?: any): GlobalApiResponse {
    return new GlobalApiResponse({ success: true, data });
  }

  static error(error: {
    message: string;
    stack?: string;
    statusCode?: number;
  }): GlobalApiResponse {
    return new GlobalApiResponse({
      success: false,
      errorMessage: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
    });
  }
}
