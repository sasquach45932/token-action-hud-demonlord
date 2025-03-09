/**
 * Module-based constants
 */
export const MODULE = {
	ID: "token-action-hud-demonlord"
}

/**
 * Core module
 */
export const CORE_MODULE = {
	ID: "token-action-hud-core"
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = "2.0"

/**
 * Action types
 */
export const ACTION_TYPE = {
	item: "tokenActionHud.template.item",
	utility: "tokenActionHud.utility"
}

/**
 * Groups
 */
export const GROUP = {
	armor: { id: "armor", name: "tokenActionHud.demonlord.armor", type: "system" },
	consumables: { id: "consumables", name: "tokenActionHud.demonlord.consumables", type: "system" },
	containers: { id: 'containers', name: 'tokenActionHud.demonlord.containers', type: 'system' },
	items: { id: "items", name: "DL.TabsItems", type: "system" },
	weapons: { id: "weapons", name: "tokenActionHud.demonlord.weapons", type: "system" },
	combat: { id: "combat", name: "DL.CreatureAttackOptions", type: "system" },
	token: { id: "token", name: "tokenActionHud.token", type: "system" },
	utility: { id: "utility", name: "tokenActionHud.utility", type: "system" },
	initiative: { id: "initiative", name: "DL.DialogRequestInitiative", type: "system" },	
	attributes: { id: "attributes", name: "DL.Attributes", type: "system" },
	talents: { id: "talents", name: "DL.TalentTitle", type: "system" },
	spells_attack: { id: "spells_attack", name: "DL.SpellTypeAttack", type: "system" },
	spells_utility: { id: "spells_utility", name: "DL.SpellTypeUtility", type: "system" },
	combat_endoftheround: { id: "combat_endoftheround", name: "DL.CreatureSpecialEndRound", type: "system" },
	combat_talent: { id: "combat_talent", name: "DL.CreatureSpecialAttacks", type: "system" },
	combat_specialaction: { id: "combat_specialaction", name: "DL.CreatureSpecialActions", type: "system" },
	relics: { id: "relics", name: "DL.TabsRelics", type: "system" },
	ammo: { id: "ammo", name: "DL.AmmoTitle", type: "system" },
	traits: { id: "traits", name: "DL.CreatureTraits", type: "system" },
	features: { id: "features", name: "DL.FeaturesTitle", type: "system" },
	professions: { id: "professions", name: "DL.ProfessionsTitle", type: "system" },
	languages: { id: "languages", name: "DL.CharLanguages", type: "system" },
	rest: { id: "rest", name: "DL.RestAction", type: "system" },
}

/**
 * Item types
 */
export const ITEM_TYPE = {
	armor: { groupId: "armor" },
	ammo: { groupId: "ammo" },
	weapon: { groupId: "weapons" }
}
