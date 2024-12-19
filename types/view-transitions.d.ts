interface Document {
  startViewTransition(callback: () => Promise<void> | void): {
    ready: Promise<void>;
  };
}
