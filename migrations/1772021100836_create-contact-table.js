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
    pgm.sql(
        `CREATE TABLE IF NOT EXISTS contact (id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL, "phoneNumber" TEXT DEFAULT 'NA', email TEXT DEFAULT 'NA', address TEXT DEFAULT 'NA', "createdAt" TIMESTAMPTZ DEFAULT NOW(), "deletedAt" TIMESTAMPTZ DEFAULT NULL)`
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`DROP TABLE contact`)
};
