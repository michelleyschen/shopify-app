import {ReactWrapper} from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveThrownErrorDuringRender(): void;
    }
  }
}

function toHaveThrownErrorDuringRender(
  received: ReactWrapper<any, any>,
): {pass: boolean; message(): string} {
  const errorBoundary = received.find(ErrorBoundary);
  const error =
    errorBoundary.length > 0 && (errorBoundary.instance().state as any).error;
  const pass = Boolean(error);

  return {
    pass,
    message() {
      return pass
        ? `Expected component not to have thrown error, but it threw ${error}.`
        : 'Expected component to have thrown error, but it did not throw.';
    },
  };
}

expect.extend({
  toHaveThrownErrorDuringRender,
});

export {};
