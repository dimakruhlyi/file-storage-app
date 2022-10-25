import { ImageSourcePropType } from 'react-native';

enum FileType {
  PDF = 'application/pdf',
  DOC = 'application/msword',
  XLS = 'application/vnd.ms-excel',
}

export function getFileImage(type: string): ImageSourcePropType {
  switch (type) {
    case FileType.PDF:
      return require('../../assets/images/files/pdfFile.png');
    case FileType.DOC:
      return require('../../assets/images/files/wordFile.png');
    case FileType.XLS:
      return require('../../assets/images/files/excelFile.png');
    default:
      return require('../../assets/images/files/defaultFile.png');
  }
}
