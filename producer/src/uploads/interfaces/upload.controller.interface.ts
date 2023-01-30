export interface UploadsController {
  upload(file: any, formatMapper: any): Promise<any>;
}
