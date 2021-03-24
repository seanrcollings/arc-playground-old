import { writable } from "svelte/store";
import type { Snippet } from "./snippets";
import { basicExample } from "./snippets";

export const snippet = writable<Snippet>(basicExample);
