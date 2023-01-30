import { GenericResponseDto } from '../dtos/generic-response.dto';

export const INVALID_ENDWITH_FORMAT = new GenericResponseDto(
  1,
  'invalid format, please try again with xlsx format',
);

export const INVALID_FORMAT_MAPPER = new GenericResponseDto(
  2,
  "format mapper invalid, the mapper don't match with the xlsx file format",
);

export const INVALID_FORMAT_MAPPER_JSON = new GenericResponseDto(
  3,
  'format mapper invalid,',
);
export const FILE_XLSX_IS_REQUIRED = new GenericResponseDto(
  4,
  'the file xlsx is required, please try again',
);
