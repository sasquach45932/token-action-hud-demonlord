import { MODULE } from "./constants.js"

/**
 * Register module settings
 * Called by Token Action HUD Core to register Token Action HUD system module settings
 * @param {function} coreUpdate Token Action HUD Core update function
 */
export function register(coreUpdate) {
	game.settings.register(MODULE.ID, "displayUnequipped", {
		name: game.i18n.localize("tokenActionHud.demonlord.settings.displayUnequipped.name"),
		hint: game.i18n.localize("tokenActionHud.demonlord.settings.displayUnequipped.hint"),
		scope: "client",
		config: true,
		type: Boolean,
		default: true,
		onChange: value => {
			coreUpdate(value)
		}
	})
	game.settings.register(MODULE.ID, "displayProfessions", {
		name: game.i18n.localize("tokenActionHud.demonlord.settings.displayProfessions.name"),
		hint: game.i18n.localize("tokenActionHud.demonlord.settings.displayProfessions.hint"),
		scope: "client",
		config: true,
		type: Boolean,
		default: false,
		onChange: value => {
			coreUpdate(value)
		}
	})
    game.settings.register(MODULE.ID, 'displayLanguages', {
        name: game.i18n.localize('tokenActionHud.demonlord.settings.displayLanguages.name'),
        hint: game.i18n.localize('tokenActionHud.demonlord.settings.displayLanguages.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            coreUpdate(value)
        }        
    })    
	game.settings.register(MODULE.ID, "displayFeatures", {
		name: game.i18n.localize("tokenActionHud.demonlord.settings.displayFeatures.name"),
		hint: game.i18n.localize("tokenActionHud.demonlord.settings.displayFeatures.hint"),
		scope: "client",
		config: true,
		type: Boolean,
		default: true,
		onChange: value => {
			coreUpdate(value)
		}
	})
	game.settings.register(MODULE.ID, "displayTalents", {
		name: game.i18n.localize("tokenActionHud.demonlord.settings.displayTalents.name"),
		hint: game.i18n.localize("tokenActionHud.demonlord.settings.displayTalents.hint"),
		scope: "client",
		config: true,
		type: Boolean,
		default: true,
		onChange: value => {
			coreUpdate(value)
		}
	})
	game.settings.register(MODULE.ID, "displayTraits", {
		name: game.i18n.localize("tokenActionHud.demonlord.settings.displayTraits.name"),
		hint: game.i18n.localize("tokenActionHud.demonlord.settings.displayTraits.hint"),
		scope: "client",
		config: true,
		type: Boolean,
		default: true,
		onChange: value => {
			coreUpdate(value)
		}
	})
}
