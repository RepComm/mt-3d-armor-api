
import { MtItemGroups, MtItemName, MtItemStack, MtPlayer, MtToolCapabilities, MtVec3 } from "@repcomm/mt-api";

export interface ArmorDef {
  description: string;
  inventory_image: string;
  groups: Partial<MtItemGroups>;
  armor_groups: Partial<ArmorGroups>;
  damage_groups: Partial<MtItemGroups>;
}

export interface ArmorGroups {
  [key: string]: number;
  fleshy: number;
}

export type ArmorBase = string;

export type ArmorElement = "head" | "torso" | "hands" | "shield" | "legs" | "feet";

export interface InventoryList {
  [key: string]: MtItemName;
}

export interface InventoryUpdateCallback {
  (this: void, player: MtPlayer, index: number, stack: MtItemStack): void;
}

export interface ArmorGlobal {
  /**Registers a new armor item.*/
  register_armor(name: string, def: ArmorDef): void;
  /**Registers a new armor group*/
  register_armor_group(group: ArmorGroups, base: ArmorBase): void;

  /**Runs callbacks*/
  run_callbacks(callback: () => void, player: MtPlayer, index: number, stack: MtItemStack): void;

  /**Updates visuals*/
  update_player_visuals(player: MtPlayer): void;

  /**Sets player's armor attributes*/
  set_player_armor(player: MtPlayer): void;

  /**Action when armor is punched*/
  punch(player: MtPlayer, hitter?: MtPlayer, time_from_last_punch?: number, tool_capabilities?: MtToolCapabilities): void;

  /**Action when armor is damaged*/
  damage(player: MtPlayer, index: number, stack: MtItemStack, use: number): void;

  /**Get elements of equipped armor*/
  get_weared_armor_elements(player: MtPlayer): void;

  /**Equips a piece of armor to a player*/
  equip(player: MtPlayer, itemstack: MtItemStack): void;

  /**Unequips a piece of armor from a player*/
  unequip(player: MtPlayer, armor_element: ArmorElement): void;

  /**Removes all armor worn by player*/
  remove_all(player: MtPlayer): void;

  /**Retrieves player's current skin*/
  get_player_skin(name: string): void;

  /**Updates skin*/
  update_skin(name: string): void;

  /**Adds preview for armor inventory*/
  add_preview(preview: string): void;

  /**Retrieves preview for armor inventory*/
  get_preview(name: string): string;

  /**Retrieves armor formspec*/
  get_armor_formspec(name: string, listring?: boolean): string;

  /**Retrieves element*/
  get_element(item_name: string): ArmorElement;

  /**Serializes armor inventory*/
  serialize_inventory_list(list: InventoryList): string;

  /**Deserializes armor inventory*/
  deserialize_inventory_list(list_string: string): InventoryList;

  /**Loads armor inventory*/
  load_armor_inventory(player: MtPlayer): boolean;

  /**Saves armor inventory*/
  save_armor_inventory(player: MtPlayer): void;

  /**Updates inventory*/
  update_inventory(player: MtPlayer): void;

  /**Sets inventory stack*/
  set_inventory_stack(player: MtPlayer, i: number, stack: MtItemStack): void;

  /**Checks for a player that can use armor*/
  get_valid_player(player: MtPlayer, msg: string): [string, InventoryList];

  /**Drops armor item at given position*/
  drop_armor(pos: MtVec3, stack: MtItemStack): void;

  /**Allows skin mod to be set manually*/
  set_skin_mod(mod: string): void;

  //Callbacks Registration

  /**Registers a callback for when player visuals are update.*/
  register_on_update(func: InventoryUpdateCallback): void;

  /**Registers a callback for when armor is equipped*/
  register_on_equip(func: InventoryUpdateCallback): void;

  /**Registers a callback for when armor is unequipped*/
  register_on_unequip(func: InventoryUpdateCallback): void;

  /**Registers a callback for when armor is damaged*/
  register_on_damage(func: InventoryUpdateCallback): void;

  /**Registers a callback for when armor is destroyed*/
  register_on_destroy(func: InventoryUpdateCallback): void;
}

declare global {
  const armor: ArmorGlobal;
}
