import { writable } from "svelte/store";
import type { Snippet } from "./examples";
import { basicExample } from "./examples";

export const snippet = writable<Snippet>(basicExample);
