const IGNORE_ERROR_MESSAGES = [/at mountIndeterminateComponent/];
const IGNORABLE_TEST_ERRORS = [
  // the next line should come with another error
  /The above error occurred in (the <.*>|one of your React) components?:/,
];

export function withIgnoredReactLogs<T>(run: () => T) {
  /* eslint-disable no-console */
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const [firstArgument] = args;
    if (
      typeof firstArgument === 'string' &&
      IGNORABLE_TEST_ERRORS.some((regex) => regex.test(firstArgument))
    ) {
      return;
    }

    originalConsoleError.call(console, ...args);
  };

  function handleErrorEvent(event: ErrorEvent) {
    const {error} = event;

    // I want to silence all errors and know what I'm doing
    if (
      error != null &&
      IGNORE_ERROR_MESSAGES.some(
        (ignore) => typeof error.stack === 'string' && ignore.test(error.stack),
      )
    ) {
      event.preventDefault();
    }
  }

  window.addEventListener('error', handleErrorEvent);

  try {
    return run();
  } finally {
    console.error = originalConsoleError;
    window.removeEventListener('error', handleErrorEvent);
  }
  /* eslint-enable no-console */
}
