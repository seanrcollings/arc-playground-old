declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onpanstart?: () => void;
    onpanmove?: (event: CustomEvent) => void;
    onpanend?: (event: CustomEvent) => void;
  }
}

declare module "ansi-to-html" {
  interface ColorObject {
    [key: number]: string;
  }

  type Colors = ColorObject | number[];

  interface ConvertOptions {
    fg?: string;
    bg?: string;
    newline?: boolean;
    escapeXML?: boolean;
    stream?: boolean;
    color?: Colors;
  }

  export class Convert {
    constructor(options?: ConvertOptions);

    toHtml(ansiString: string): string;
  }

  export default Convert;
}
