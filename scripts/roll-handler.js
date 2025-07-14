export let RollHandler = null

Hooks.once("tokenActionHudCoreApiReady", async coreModule => {
	/**
	 * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
	 */
	RollHandler = class RollHandler extends coreModule.api.RollHandler {
		/**
		 * Handle action click
		 * Called by Token Action HUD Core when an action is left or right-clicked
		 * @override
		 * @param {object} event        The event
		 * @param {string} encodedValue The encoded value
		 */
		async handleActionClick(event, encodedValue) {
			const [actionTypeId, actionId] = encodedValue.split("|")

			const renderable = ["item"]

			if (renderable.includes(actionTypeId) && this.isRenderItem()) {
				return this.doRenderItem(this.actor, actionId)
			}

			const knownCharacters = ["character"]

			// If single actor is selected
			if (this.actor) {
				await this.#handleAction(event, this.actor, this.token, actionTypeId, actionId)
				return
			}

			const controlledTokens = canvas.tokens.controlled.filter(token => knownCharacters.includes(token.actor?.type))

			// If multiple actors are selected
			for (const token of controlledTokens) {
				const actor = token.actor
				await this.#handleAction(event, actor, token, actionTypeId, actionId)
			}
		}

		/**
		 * Handle action hover
		 * Called by Token Action HUD Core when an action is hovered on or off
		 * @override
		 * @param {object} event        The event
		 * @param {string} encodedValue The encoded value
		 */
		async handleActionHover(event, encodedValue) {}

		/**
		 * Handle group click
		 * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
		 * @override
		 * @param {object} event The event
		 * @param {object} group The group
		 */
		async handleGroupClick(event, group) {}

		/**
		 * Handle action
		 * @private
		 * @param {object} event        The event
		 * @param {object} actor        The actor
		 * @param {object} token        The token
		 * @param {string} actionTypeId The action type id
		 * @param {string} actionId     The actionId
		 */
		async #handleAction(event, actor, token, actionTypeId, actionId) {
			switch (actionTypeId) {
				case "rest":
					const restTime = actionId === "24hrs" ? 24 : 8
					actor.restActor(restTime, true, true, true)
					break
				case "item":
					this.#handleItemAction(event, token, actor, actionId)
					break
				case "turn":
					if (actionId === "slow") this.token.actor.update({ "system.fastturn": false })
					else this.token.actor.update({ "system.fastturn": true })
					break
				case "fortune":
					this.actor.expendFortune()
					// As of SotDL v5.0.9:
					await this.actor.update({ 'system.characteristics.fortune': 0 })
					break
				case "corruption":
					this.actor.rollCorruption()
					break
				case "initiative":
					let combatantFound = null
					for (const combatant of game.combat.combatants) {
						if (combatant.actor?._id === this.actor._id) {
						combatantFound = combatant
						}
					}
					if (combatantFound) {
						await game.combat.rollInitiative(combatantFound._id)
					}
					break
				case "relic":
					this.actor.rollItem(actionId)
					break
				case "endoftheround":
					this.#handleItemAction(event, token, actor, actionId)
					break
				case "specialaction":
					this.#handleItemAction(event, token, actor, actionId)
					break
				case "utility":
					this.#handleUtilityAction(token, actionId)
					break
				case "spell":
					this.actor.rollSpell(actionId)
					break
				case "talent":
					this.actor.rollTalent(actionId)
					break
				case "challengeRoll":
					if (!actor.system.attributes[actionId].immune) {
						if (game.user.targets?.ids.length) {
							this.actor.rollAttack(actionId)
						} else {
							this.actor.rollChallenge(actionId)
						}
					}
					break
				default:
					this.#handleItemAction(event, token, actor, actionId)
					break
			}
		}

		/**
		 * Handle item action
		 * @private
		 * @param {object} event    The event
		 * @param {object} actor    The actor
		 * @param {string} actionId The action id
		 */
		#handleItemAction(event, token, actor, actionId) {
			const item = actor.items.get(actionId)
			switch (item.type) {
				case "weapon":
					actor.rollWeaponAttack(item._id)
					break
				case "endoftheround":
					actor.rollItem(item._id)
					break
				case "specialaction":
					actor.rollItem(item._id)
					break
				default:
					item.sheet.render(true)
					break
			}
		}

		/**
		 * Handle utility action
		 * @private
		 * @param {object} token    The token
		 * @param {string} actionId The action id
		 */
		async #handleUtilityAction(token, actionId) {
			switch (actionId) {
				case "endTurn":
					if (game.combat?.current?.tokenId === token.id) {
						await game.combat?.nextTurn()
					}
					break
			}
		}
	}
})
