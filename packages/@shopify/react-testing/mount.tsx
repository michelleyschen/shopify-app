import * as React from 'react';
import {ReactWrapper} from 'enzyme';

type Wrapper<Context extends object> = AppContextReactWrapper<never, never> &
  Context;

interface Options<
  Async extends boolean,
  MountOptions extends object,
  Context extends object
> {
  context: (options: MountOptions) => Context;
  render(
    element: React.ReactElement<any>,
    context: Context,
  ): React.ReactElement<any>;
  afterMount?(
    wrapper: Wrapper<Context>,
    context: Context,
    options: MountOptions,
  ): Async extends true ? Promise<Wrapper<Context>> : Wrapper<Context>;
}

export class AppContextReactWrapper<P, S> extends ReactWrapper<P, S> {}

export function createAppContextMount<
  Async extends boolean,
  MountOptions extends object,
  Context extends object
>({
  render,
  context: createContext,
  afterMount,
}: Options<Async, MountOptions, Context>): (
  element: React.ReactElement<any>,
  options?: MountOptions,
) => Async extends true ? Promise<Wrapper<Context>> : Wrapper<Context> {
  function mount<P>(element: React.ReactElement<P>, options?: MountOptions) {
    const context = createContext(options || ({} as any));

    const wrapper = new AppContextReactWrapper(render(element, context));

    for (const [key, value] of Object.entries(context)) {
      Object.defineProperty(wrapper, key, {
        writable: false,
        value,
      });
    }

    return afterMount
      ? (afterMount as Function)(wrapper, context, options || {})
      : wrapper;
  }

  return mount as any;
}
