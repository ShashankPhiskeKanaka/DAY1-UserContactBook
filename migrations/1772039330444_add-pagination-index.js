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
    pgm.noTransaction(); // node-pg-migrate wraps every migration in a transaction (BEGIN/COMMIT) but postgres explicitly forbids create index concurrently inside a transaction because it needs to manage its own multistep commit process
    pgm.sql(
        `CREATE INDEX CONCURRENTLY IF NOT EXISTS "idxContact" 
        ON contact ("createdAt" DESC, id DESC);`
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(
        `DROP INDEX CONCURRENTLY IF EXISTS idx_contacts;`
    )
};
