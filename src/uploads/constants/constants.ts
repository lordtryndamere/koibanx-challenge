export const UPLOADS_SERVICE = 'uploadService';
export const UPLOADS_REPOSITORY = 'uploadRepository';
export const EXCEL_UPLOADS_AMQ = 'excelUploadAmq';
export const CLIENT_PROXY_EXCEL_UPLOAD = 'clientProxyExcelUpload';
export const TRANSACTION_MODEL = 'TRANSACTION_MODEL';
export const DATABASE_CONNECTION = 'databaseConnection';
export const INVALID_FORMAT = 'INVALID_FORMAT';
export const INVALID_FORMAT_CODE = 401;
export enum IntegrationEventSubject {
  EXCEL_UPLOAD = 'Excel.upload',
}
export enum States {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}
