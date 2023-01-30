export class GenericResponseDto {
  constructor(code: number, message: string, data?: any, error?: any) {
    this.code = code;
    this.message = message;
    if (data) this.data = data;
    if (error) this.error = error;
  }
  code: number;
  message: string;
  data?: any;
  error?: any;
}
