import { writable, type Writable } from "svelte/store";
import type { Pokemon } from "../types";

export const pokemons:Writable<Pokemon[]> = writable([])
export const loading:Writable<boolean> = writable(false)
export const endOfList:Writable<boolean> = writable(false)
export const error:Writable<string> = writable('')
