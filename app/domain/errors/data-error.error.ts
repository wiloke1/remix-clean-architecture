export class DataError extends Error {
  constructor(public cause?: Error) {
    super();
    this.name = 'DataError';
    this.message = 'Lỗi hiển thị ở đây';
  }
}
