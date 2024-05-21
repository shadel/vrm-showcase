// src/utils/logger.ts

// Define the type for the log arguments
type LogArgs = unknown[]

// Log an info message
const info = (...args: LogArgs): void => {
  console.info(...args)
}

// Log a warning message
const warn = (...args: LogArgs): void => {
  console.warn(...args)
}

// Log an error message
const error = (...args: LogArgs): void => {
  console.error(...args)
}

export default { info, warn, error }
