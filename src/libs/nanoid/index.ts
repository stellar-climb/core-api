import { customAlphabet } from 'nanoid';

export function customNanoId(size: number) {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', size)();
}
