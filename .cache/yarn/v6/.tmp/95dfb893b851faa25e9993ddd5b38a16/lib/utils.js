import { PathExt } from '@jupyterlab/coreutils';
/** Get the filename from a path */
export function extractFilename(path) {
    if (path[path.length - 1] === '/') {
        return path;
    }
    else {
        return PathExt.basename(path);
    }
}
export function decodeStage(x, y) {
    var _a;
    /**
     * All combinations of statuses for merge conflicts
     * @see https://git-scm.com/docs/git-status#_short_format
     */
    const unmergedCombinations = {
        D: ['D', 'U'],
        A: ['U', 'A'],
        U: ['D', 'A', 'U']
    };
    // If the file has a merge conflict
    if (((_a = unmergedCombinations[x]) !== null && _a !== void 0 ? _a : []).includes(y)) {
        return 'unmerged';
    }
    // If file is untracked
    if (x === '?' && y === '?') {
        return 'untracked';
    }
    else {
        // If file is staged
        if (x !== ' ') {
            return y !== ' ' ? 'partially-staged' : 'staged';
        }
        // If file is unstaged but tracked
        if (y !== ' ') {
            return 'unstaged';
        }
    }
    return null;
}
/**
 * Returns a promise which resolves after a specified duration.
 *
 * @param ms - duration (in milliseconds)
 * @returns a promise
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=utils.js.map