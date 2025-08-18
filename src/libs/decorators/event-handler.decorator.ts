import { EventBox } from '@libs/event-box';

export function EventHandler(
  event: new (...args: any[]) => EventBox,
  options?: { description?: string }
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
}
