export interface UploadsService {
  upload(file: any, format: any): Promise<any>;
  getTransaction(idTransaction: string): Promise<any>;
}
