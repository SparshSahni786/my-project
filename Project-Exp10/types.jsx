/**
 * @typedef {'user' | 'bot' | 'system'} RoleValue
 */

/**
 * Role "enum" equivalent for JS usage.
 * Use like: Role.USER or Role.BOT
 */
export const Role = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system',
};

/**
 * @typedef {Object} Message
 * @property {string} id - unique id for the message
 * @property {RoleValue} role - who sent the message (Role.USER | Role.BOT | Role.SYSTEM)
 * @property {string} text - message content (plain text)
 * @property {number} [timestamp] - unix epoch ms timestamp
 * @property {Object} [meta] - optional extra data (attachments, status etc.)
 */

/**
 * Factory to create a Message object (helps avoid typos).
 * @param {Object} params
 * @param {string} params.id
 * @param {RoleValue} params.role
 * @param {string} params.text
 * @param {number} [params.timestamp]
 * @param {Object} [params.meta]
 * @returns {Message}
 */
export function createMessage({ id, role, text, timestamp = Date.now(), meta = {} }) {
  return { id, role, text, timestamp, meta };
}

/**
 * Small runtime helper to check if an object looks like a Message.
 * @param {any} obj
 * @returns {boolean}
 */
export function isMessage(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    (obj.role === Role.USER || obj.role === Role.BOT || obj.role === Role.SYSTEM) &&
    typeof obj.text === 'string'
  );
}
