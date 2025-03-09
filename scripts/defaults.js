import { GROUP } from "./constants.js"

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once("tokenActionHudCoreApiReady", async coreModule => {
	const groups = GROUP
	Object.values(groups).forEach(group => {
		group.name = coreModule.api.Utils.i18n(group.name)
		group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
	})
	const groupsArray = Object.values(groups)
	DEFAULTS = {
		layout: [
			{
				nestId: "inventory",
				id: "inventory",
				name: coreModule.api.Utils.i18n("DL.TabsInventory"),
				groups: [
					{ ...groups.armor, nestId: "inventory_armor" },
					{ ...groups.consumables, nestId: "inventory_consumables" },
					{ ...groups.items, nestId: "inventory_items" },
					{ ...groups.containers, nestId: 'inventory_containers' },				
					{ ...groups.relics, nestId: "inventory_relics" }
				]
			},
			{
				nestId: "combat",
				id: "combat",
				name: coreModule.api.Utils.i18n("DL.TabsCombat"),
				groups: [
					{ ...groups.weapons, nestId: "combat_weapons" },
					{ ...groups.ammo, nestId: "inventory_ammo" },				
					{ ...groups.combat_talent, nestId: "combat_talent" },
					{ ...groups.combat_specialaction, nestId: "combat_specialaction" },
					{ ...groups.combat_endoftheround, nestId: "combat_endoftheround" }
				]
			},
			{
				nestId: "attributes",
				id: "attributes",
				name: coreModule.api.Utils.i18n("DL.ChallengeRoll"),
				groups: [{ ...groups.attributes, nestId: "attributes_rolls" }]
			},			
			{
				nestId: "features",
				id: "features",
				name: coreModule.api.Utils.i18n("DL.FeaturesTitle"),
				groups: [{ ...groups.features, nestId: "features_list" }]
			},
			{
				nestId: "traits",
				id: "traits",
				name: coreModule.api.Utils.i18n("DL.CreatureTraits"),
				groups: [{ ...groups.traits, nestId: "traits_list" }]
			},
			{
				nestId: "talents",
				id: "talents",
				name: coreModule.api.Utils.i18n("DL.TalentTitle"),
				groups: [{ ...groups.talents, nestId: "talents_list" }]
			},
			{
				nestId: "spells",
				id: "spells",
				name: coreModule.api.Utils.i18n("DL.CreatureSpecialMagic"),
				groups: [
					{ ...groups.spells_attack, nestId: "spells_attack" },
					{ ...groups.spells_utility, nestId: "spells_utility" }
				]
			},
			{
				nestId: "professions",
				id: "professions",
				name: coreModule.api.Utils.i18n("DL.ProfessionsTitle"),
				groups: [{ ...groups.professions, nestId: "professions_list" }]
			},
			{
				nestId: "languages",
				id: "languages",
				name: coreModule.api.Utils.i18n("DL.CharLanguages"),
				groups: [{ ...groups.languages, nestId: "languages_list" }]
			},
			{
				nestId: "utility",
				id: "utility",
				name: coreModule.api.Utils.i18n("tokenActionHud.utility"),
				groups: [
					{ ...groups.combat, nestId: "utility_combat" },
					{ ...groups.token, nestId: "utility_token" },
					{ ...groups.rest, nestId: "utility_rest" },
					{ ...groups.initiative, nestId: "utility_initiative" },
					{ ...groups.utility, nestId: "utility_utility" }					
				]
			}
		],
		groups: groupsArray
	}
})
