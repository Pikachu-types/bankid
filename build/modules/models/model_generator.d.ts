/**
 * Model generation helper
 */
export declare class ModelGenerator {
    /**
     * Generate a pasby user document model skeleton
     * @returns {Record<string, unknown>} map
     */
    static id(): Record<string, unknown>;
    /**
     * Generate a standalone pasby model skeleton
     * @returns {Record<string, unknown>} map
     */
    static pasby(): Record<string, unknown>;
}
