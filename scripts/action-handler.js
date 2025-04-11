// System Module Imports
import { ACTION_TYPE, ITEM_TYPE } from "./constants.js"
import { Utils } from "./utils.js"

export let ActionHandler = null

Hooks.once("tokenActionHudCoreApiReady", async coreModule => {
	/**
	 * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
	 */
	ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
		/**
		 * Build system actions
		 * Called by Token Action HUD Core
		 * @override
		 * @param {array} groupIds
		 */ a
		async buildSystemActions(groupIds) {
			// Set actor and token variables
			this.actors = !this.actor ? this._getActors() : [this.actor]
			this.actorType = this.actor?.type

			// Settings
			this.displayUnequipped = Utils.getSetting("displayUnequipped")
			this.displayProfessions = Utils.getSetting("displayProfessions")
			this.displayLanguages = Utils.getSetting("displayLanguages")
			this.displayTalents = Utils.getSetting("displayTalents")
			this.displayFeatures = Utils.getSetting("displayFeatures")
			this.displayTraits = Utils.getSetting("displayTraits")

			// Set items variable
			if (this.actor) {
				let items = this.actor.items
				items = coreModule.api.Utils.sortItemsByName(items)
				this.items = items
			}

			// if (this.actorType === 'character' || this.actorType === 'creature') {
			//     this.#buildCharacterActions()
			// } else if (!this.actor) {
			//     this.#buildMultipleTokenActions()
			// }

			switch (this.actorType) {
				case "character":
					this.#buildCharacterActions()
					break
				case "creature":
					this.#buildCreatureActions()
					break
				default:
					break
			}
		}

		plusify(x) {
			if (typeof x === "string" || x instanceof String) {
				return x[0] === "+" ? x : "+" + x
			}
			if (x == 0) return "0"
			return x > 0 ? "+" + x : x
		}

		#buildMagic() {
			let spellsArray = []
			let spells = this.actor.items.filter(x => x.type === "spell" && x.system.spelltype === "Attack" && x.system.castings.value < x.system.castings.max)
			for (let a of spells) {
				let castingsValue = a.system.castings.value ? a.system.castings.value : 0
				const name = a.name + ` (${castingsValue}/${a.system.castings.max})`
				const info1 = a.system.tradition
				const encodedValue = "spell|" + a._id
				spellsArray.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(spellsArray, { id: "spells_attack", type: "system" })

			spellsArray = []
			spells = this.actor.items.filter(x => x.type === "spell" && x.system.spelltype === "Utility" && x.system.castings.value < x.system.castings.max)
			for (let a of spells) {
				let castingsValue = a.system.castings.value ? a.system.castings.value : 0
				const name = a.name + ` (${castingsValue}/${a.system.castings.max})`
				const info1 = a.system.tradition
				const encodedValue = "spell|" + a._id
				spellsArray.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(spellsArray, { id: "spells_utility", type: "system" })
		}

		#buildTalents() {
			let talentsArray = []
			let talents = this.actor.items.filter(x => x.type === "talent")
			for (let a of talents) {
				const name = a.name + ` (${a.system.groupname})`
				const info1 = a.system.groupname
				const encodedValue = "talent|" + a._id
				talentsArray.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(talentsArray, { id: "talents", type: "system" })
		}

		#buildRelics() {
			let array = []
			let item = this.actor.items.filter(x => x.type === "relic")
			for (let a of item) {
				const name = a.name
				const info1 = a.system.groupname
				const encodedValue = "relic|" + a._id
				array.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(array, { id: "relics", type: "system" })
		}

		#buildLanguages() {
			let array = []
			let item = this.actor.items.filter(x => x.type === "language")
			for (let a of item) {
				const name = a.name
				const info1 = a.system.groupname
				const encodedValue = "language|" + a._id
				const img = 'systems/demonlord/assets/icons/other/books/book2.webp'
				array.push({ name, id: a, info1, encodedValue: encodedValue, img: img })
			}
			this.addActions(array, { id: "languages", type: "system" })
		}

		#builFortune() {
			let array = []
			const name = coreModule.api.Utils.i18n("tokenActionHud.demonlord.expendFortune")
			const encodedValue = "fortune|" + ""
			const img = "systems/demonlord/assets/icons/skills/challenge.webp"
			array.push({ name, id: "fortune", encodedValue: encodedValue, img: img })
			if (this.actor.system.characteristics.fortune) this.addActions(array, { id: "utility", type: "system" })
		}

		#buildCorruption() {
			let array = []
			const name = coreModule.api.Utils.i18n("DL.CharRolCorruption")
			const encodedValue = "corruption|" + ""
			const img = "systems/demonlord/assets/icons/skills/skull.webp"
			array.push({ name, id: "corruption", encodedValue: encodedValue, img: img })
			this.addActions(array, { id: "utility", type: "system" })
		}

		#buildInitiative() {
			let array = []
			let name = coreModule.api.Utils.i18n("DL.TurnSlowButton")
			let encodedValue = "turn|" + "slow"
			let img = "icons/sundries/gaming/dice-runed-tan.webp"
			let cssClass = this.actor.system.fastturn ? "" : "toggle active"
			array.push({ name, id: "slowturn", encodedValue: encodedValue, cssClass: cssClass, img: img })
			name = coreModule.api.Utils.i18n("DL.TurnFastButton")
			encodedValue = "turn|" + "fast"
			img = "icons/sundries/gaming/dice-runed-brown.webp"
			cssClass = !this.actor.system.fastturn ? "" : "toggle active"
			array.push({ name, id: "fastturn", encodedValue: encodedValue, cssClass: cssClass, img: img })
			this.addActions(array, { id: "initiative", type: "system" })
		}

		#buildRest() {
			let array = []
			let name = coreModule.api.Utils.i18n( "DL.DialogRest8hrs")
			let encodedValue = "rest|" + "8hrs"
			let img = "icons/magic/time/day-night-sun-moon.webp"
			array.push({ name, id: "slowturn", encodedValue: encodedValue, img: img })
			name = coreModule.api.Utils.i18n("DL.DialogRest24hrs")
			encodedValue = "rest|" + "24hrs"
			array.push({ name, id: "fastturn", encodedValue: encodedValue,  img: img })
				this.addActions(array, { id: "rest", type: "system" })
		}

		#buildProfessions() {
			let talentsArray = []
			let talents = this.actor.items.filter(x => x.type === "profession")
			for (let a of talents) {
				const name = a.name
				const info1 = a.system.groupname
				const encodedValue = "profession|" + a._id
				talentsArray.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(talentsArray, { id: "professions", type: "system" })
		}

		#buildConsumables() {
			let array = []
			let items = this.actor.items.filter(x => x.type === "item" && x.system.consumabletype !== "")
			for (let a of items) {
				const name = `${a.name} (${a.system.quantity})`
				const info1 = a.system.groupname
				const encodedValue = "item|" + a._id
				if (a.system.quantity) array.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(array, { id: "consumables", type: "system" })
		}

		#buildItems() {
			let array = []
			let items = this.actor.items.filter(x => x.type === "item" && x.system.consumabletype === "" && !x.system.contents.length)
			for (let a of items) {
				const info1 = a.system.groupname
				const encodedValue = "item|" + a._id
				if (a.system.quantity) array.push({ name : a.name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(array, { id: "items", type: "system" })
		}

		#buildContainers() {
			let array = []
			let items = this.actor.items.filter(x => x.type === "item" && x.system.consumabletype === "" && x.system.contents.length)
			for (let a of items) {
				let name = `${a.name} (${a.system.contents.length})`
				const info1 = a.system.groupname
				const encodedValue = "item|" + a._id
				if (a.system.quantity) array.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(array, { id: "containers", type: "system" })
		}

		#buildTraitsAndFeatures() {
			let traitsArray = []
			let traits = this.actor.items.filter(x => x.type === "feature")
			for (let a of traits) {
				const name = a.name
				const info1 = a.system.groupname
				const encodedValue = "feature|" + a._id
				traitsArray.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			if (this.actor.type === "character") {
				this.addActions(traitsArray, { id: "features", type: "system" })
			} else this.addActions(traitsArray, { id: "traits", type: "system" })
		}

		#buildCreatureCombat(type) {
			let actionsArray = []
			let actions = this.actor.items.filter(x => x.type === type)
			for (let a of actions) {
				const name = a.name /*+ ` (${a.system.action.damage})`*/
				const info1 = a.system.groupname
				const encodedValue = `${type}|${a._id}`
				actionsArray.push({ name, id: a, info1, encodedValue: encodedValue, img: a.img })
			}
			this.addActions(actionsArray, { id: `combat_${type}`, type: "system" })
		}

		#buildChallangeRolls() {
			const challengeRollArray = []
			const attributes = this.actor.system.attributes
			let img
			for (let a in this.actor.system.attributes) {
				const name = game.i18n.localize(attributes[a].label)
				const attributeEncodedValue = ["challengeRoll", a].join("|")
				const info1 = attributes[a].immune ? { text: "–" } : { text: `${attributes[a].value}(${this.plusify(attributes[a].modifier)})` }

				switch (a) {
					case "strength":
						img = "systems/demonlord/assets/icons/skills/strength.webp"
						break
					case "agility":
						img = "systems/demonlord/assets/icons/skills/agility.webp"
						break
					case "will":
						img = "systems/demonlord/assets/icons/skills/will.webp"
						break
					case "intellect":
						img = "systems/demonlord/assets/icons/skills/intellect.webp"
						break
					case "perception":
						img = "systems/demonlord/assets/icons/skills/perception.webp"
						break
				}

				if (!attributes[a].immune) challengeRollArray.push({ name, id: a, info1, encodedValue: attributeEncodedValue, img: img })
			}
			this.addActions(challengeRollArray, { id: "attributes", type: "system" })
		}

		/**
		 * Build character actions
		 * @private
		 */
		#buildCharacterActions() {
			this.#buildInventory()
			this.#buildMagic()
			if (this.displayTalents) this.#buildTalents()
			this.#buildChallangeRolls()
			if (this.displayFeatures) this.#buildTraitsAndFeatures()
			if (this.displayProfessions) this.#buildProfessions()
			this.#buildConsumables()
			this.#buildRelics()
			if (this.displayLanguages) this.#buildLanguages()
			this.#builFortune()
			this.#buildCorruption()
			this.#buildInitiative()
			this.#buildItems()
			this.#buildContainers()
			this.#buildRest()
		}

		#buildCreatureActions() {
			this.#buildInventory()
			this.#buildMagic()
			this.#buildChallangeRolls()
			this.#buildInitiative()
			this.#buildCreatureCombat("specialaction")
			// Talent -> special attack
			this.#buildCreatureCombat("talent")
			this.#buildCreatureCombat("endoftheround")
			if (this.displayTraits) this.#buildTraitsAndFeatures()
		}

		/**
		 * Build multiple token actions
		 * @private
		 * @returns {object}
		 */
		#buildMultipleTokenActions() {}

		/**
		 * Build inventory
		 * @private
		 */
		async #buildInventory() {
			if (this.items.size === 0) return

			const actionTypeId = "item"
			const inventoryMap = new Map()

			for (const [itemId, itemData] of this.items) {
				const type = itemData.type
				const equipped = itemData.system.wear

				if (equipped || this.displayUnequipped) {
					const typeMap = inventoryMap.get(type) ?? new Map()
					typeMap.set(itemId, itemData)
					inventoryMap.set(type, typeMap)
				}
			}

			for (const [type, typeMap] of inventoryMap) {
				const groupId = ITEM_TYPE[type]?.groupId

				if (!groupId) continue

				const groupData = { id: groupId, type: "system" }

				// Get actions
				const actions = [...typeMap].map(([itemId, itemData]) => {
					const id = itemId
					let name = itemData.type === "ammo" ? itemData.name + ` (${itemData.system.quantity})` : itemData.name
					if (itemData.type === "weapon") {
						name = itemData.name + ` (${itemData.system.action.damage})`
					}
					const img = itemData.img
					const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
					const listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`
					const encodedValue = [actionTypeId, id].join(this.delimiter)

					return {
						id,
						name,
						listName,
						encodedValue,
						img
					}
				})

				// TAH Core method to add actions to the action list
				this.addActions(actions, groupData)
			}
		}
	}
})
