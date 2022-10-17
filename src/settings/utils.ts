import { ImageOrVideo } from 'react-native-image-crop-picker';

export function formatBytes(
  bytes: number,
  decimals: number = 2,
  isBinary: boolean = false,
): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; // or ['B', 'KB', 'MB', 'GB', 'TB']

  if (!+bytes) {
    return `0 ${sizes[0]}`;
  }

  const inByte = isBinary ? 1024 : 1000;
  const dm = decimals < 0 ? 0 : decimals;

  const pow = Math.floor(Math.log(bytes) / Math.log(inByte));
  const maxPow = Math.min(pow, sizes.length - 1);

  return `${parseFloat((bytes / Math.pow(inByte, maxPow)).toFixed(dm))} ${
    sizes[maxPow]
  }`;
}

export function getImageName(image: ImageOrVideo): string {
  const arr = image.path.split('/');
  return arr[arr.length - 1];
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}
