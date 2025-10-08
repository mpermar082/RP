// src/index.ts
/**
 * Main entry point for RPCProvider
 */

import { RPCProvider } from './rpcprovider';
import minimist from 'minimist';

/**
 * Command line arguments interface
 */
interface Args {
    /**
     * Enable verbose mode
     */
    verbose?: boolean;
    /**
     * Input file path
     */
    input?: string;
    /**
     * Output file path
     */
    output?: string;
}

/**
 * Parse command line arguments
 */
const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
    try {
        const app = new RPCProvider({
            verbose: args.verbose || false
        });

        // Log processing start message
        if (args.verbose) {
            console.log('Starting RPCProvider processing...');
        }

        const result = await app.execute();

        // Log result and output file path if provided
        if (args.verbose) {
            console.log('Processing completed successfully');
        }
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}