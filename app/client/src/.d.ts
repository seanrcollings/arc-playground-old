declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onpanstart?: () => void;
    onpanmove?: (event: CustomEvent) => void;
    onpanend?: (event: CustomEvent) => void;
  }
}
