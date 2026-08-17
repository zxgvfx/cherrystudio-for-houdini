const platform = window.electron?.process?.platform;
const isMac = platform === "darwin";
const isWin = platform === "win32" || platform === "win64";
const isLinux = platform === "linux";
const isDev = window.electron?.process?.env?.NODE_ENV === "development";
const isProd = window.electron?.process?.env?.NODE_ENV === "production";
export { isWin as a, isProd as i, isLinux as n, platform as o, isMac as r, isDev as t };
