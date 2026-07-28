import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, isAvailable } from "./shop-content";

/**
 * Carrello dello shop: context React + persistenza in localStorage,
 * così il contenuto sopravvive a refresh e navigazioni.
 * Nel carrello salviamo solo slug e quantità; il prodotto completo
 * si risolve da PRODUCTS quando serve.
 */

export type CartItem = { slug: string; qty: number };

type CartValue = {
  items: CartItem[];
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  /** Numero totale di pezzi nel carrello. */
  count: number;
  /** Somma dei prezzi, in euro. */
  subtotal: number;
};

const STORAGE_KEY = "saltini-carrello";

const CartContext = createContext<CartValue | null>(null);

// Rilegge il carrello salvato, scartando dati corrotti, slug non più
// esistenti e articoli diventati non acquistabili online.
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is CartItem => {
      if (typeof item !== "object" || item === null) {
        return false;
      }
      const { slug, qty } = item as CartItem;
      if (typeof slug !== "string" || typeof qty !== "number" || qty <= 0) {
        return false;
      }
      const product = PRODUCTS.find((p) => p.slug === slug);
      return Boolean(product) && isAvailable(product!);
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartValue>(() => {
    function add(slug: string) {
      setItems((current) => {
        const existing = current.find((item) => item.slug === slug);
        if (existing) {
          return current.map((item) => {
            if (item.slug === slug) {
              return { ...item, qty: item.qty + 1 };
            }
            return item;
          });
        }
        return [...current, { slug, qty: 1 }];
      });
    }

    function setQty(slug: string, qty: number) {
      // Quantità zero o negativa equivale a rimuovere l'articolo.
      if (qty <= 0) {
        setItems((current) => current.filter((item) => item.slug !== slug));
        return;
      }
      setItems((current) =>
        current.map((item) => {
          if (item.slug === slug) {
            return { ...item, qty };
          }
          return item;
        }),
      );
    }

    function remove(slug: string) {
      setItems((current) => current.filter((item) => item.slug !== slug));
    }

    function clear() {
      setItems([]);
    }

    let count = 0;
    let subtotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.slug === item.slug);
      if (product) {
        count += item.qty;
        subtotal += product.price * item.qty;
      }
    }

    return { items, add, setQty, remove, clear, count, subtotal };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart va usato dentro <CartProvider>");
  }
  return value;
}
