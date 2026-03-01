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
    pgm.createType("fileStatus", ['pending', 'processing', 'ready', 'failed']);

    pgm.createTable("files", {
        id : { type : 'uuid', primaryKey : true, default : pgm.func('gen_random_uuid()') },
        userId : { type : 'uuid', notNull : true, references : '"users"', onDelete : 'CASCADE' },
        name : { type : 'text', notNull : true},
        storedId : { type : 'text', notNull : true},
        storedPath : { type : 'text', notNull : true },
        fileType : { type : 'text', notNull : true },
        size : { type : 'bigint', notNull : true },
        status : { type : '"fileStatus"', notNull : true, default : 'pending' },
        createdAt : { type : 'timestamptz', notNull : true, default : pgm.func('current_timestamp') },
        deletedAt : { type : 'timestamptz', default : null }
    })

    pgm.createIndex("files", "userId");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`DROP TABLE files`)
};
