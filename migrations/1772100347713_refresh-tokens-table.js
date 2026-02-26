/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("refreshTokens", {
        id : { type : 'uuid', primaryKey : true, default : pgm.func('gen_random_uuid()') },
        userId : { type : 'uuid', notNull : true, references : '"users"', onDelete : 'CASCADE' },
        token : { type : 'text', notNull : true, unique : true },
        expiresAt : { type : 'timestamptz', notNull : true},
        familyId : { type : 'uuid', notNull : true },
        isUsed : { type : 'boolean', default : false }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
