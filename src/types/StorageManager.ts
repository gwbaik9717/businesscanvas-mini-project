interface Storage {
  get(key: string): any;
  set(key: string, value: any): void;
  clear(): void;
}

class InMemoryStorage implements Storage {
  private store: Record<string, any> = {};

  get(key: string) {
    return this.store[key] ?? null;
  }

  set(key: string, value: any) {
    this.store[key] = value;
  }

  clear() {
    this.store = {};
  }
}

class LocalStorage implements Storage {
  get(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }
}

export const StorageManager = (() => {
  const storageType = import.meta.env.VITE_STORAGE || "in-memory";

  if (storageType === "local-storage") {
    console.log("Using LocalStorage");
    return new LocalStorage();
  }
  console.log("Using InMemoryStorage");
  return new InMemoryStorage();
})();
