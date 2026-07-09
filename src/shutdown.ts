import { Server } from "http";
import { prisma } from "./database/prisma";

let isShuttingDown = false;
const shutdownTimeoutInMs = 10_000;

function closeServer(server: Server) {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(null);
            }
        });
    });
}

async function shutdown(exitCode: number = 0, server?: Server) {
    if (isShuttingDown) return;

    isShuttingDown = true;

    console.info("Graceful shutdown initiated.", { exitCode });

    const shutdownTimeout = setTimeout(() => {
        console.error("Shutdown timed out, exiting...");
        process.exit(exitCode);
    }, shutdownTimeoutInMs);

    try {
        if (server !== undefined) {
            await closeServer(server);
        }

        await prisma.$disconnect();
        clearTimeout(shutdownTimeout);
        console.info("Graceful shutdown completed, exiting...");
        process.exit(exitCode);
    } catch (error) {
        clearTimeout(shutdownTimeout)
        console.error("Error during shutdown, hard exiting...", {
           error: error instanceof Error ? error.stack : String(error), 
        });
    }
}

export function registerShutdownHandlers(server?: Server) {
    process.on("uncaughtException", async (err) => {
        console.error("Exceção não tratada, encerrando processo com segurança.", { 
            error: err.message,
            stack: err.stack,
        });

        try {
            await shutdown(1, server);
        } catch (error) {
            console.error("Error initiating graceful shutdown, hard exiting...", {
                error: error instanceof Error ? error.stack : String(error),
            });
            process.exit(1);
        }
    });

    process.on("unhandledRejection", async (err) => {
        console.error("Rejeição não tratada", { 
            reason: err instanceof Error ? err.stack : String(err),
        });

        try {
            await shutdown(1, server);
        } catch (error) {
            console.error("Error initiating graceful shutdown, hard exiting...", {
                error: error instanceof Error ? error.stack : String(error),
            });
            process.exit(1);
        }
    });

    process.on("SIGTERM", async () => {
        try {
            await shutdown(0, server);
        } catch (error) {
            console.error("Error initiating graceful shutdown, hard exiting...", {
                error: error instanceof Error ? error.stack : String(error),
            });
            process.exit(0);
        }
    });

    process.on("SIGINT", async () => {
        try {
            await shutdown(0, server);
        } catch (error) {
            console.error("Error initiating graceful shutdown, hard exiting...", {
                error: error instanceof Error ? error.stack : String(error),
            });
            process.exit(0);
        }
    });
}