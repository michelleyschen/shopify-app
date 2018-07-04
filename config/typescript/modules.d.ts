declare module 'browserslist-useragent' {
  interface Options {
    browsers?: any;
    env?: string;
    ignorePatch?: boolean;
    ignoreMinor?: boolean;
    allowHigherVersions?: boolean;
  }

  export function matchesUA(ua: string, options?: Options): boolean;
}

declare module 'serialize-javascript';
