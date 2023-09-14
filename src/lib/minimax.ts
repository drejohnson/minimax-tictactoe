import isMovesLeft from '$lib/isMovesLeft';
import evaluate from '$lib/evaluate';

const BOARD_SIZE = 3;
const MIN_SCORE = -1000;
const MAX_SCORE = 1000;

/**
 * Minimax algorithm for Tic-Tac-Toe with alpha-beta pruning.
 *
 * @param {string[][]} board - The current game board.
 * @param {number} depth - The depth of the current search.
 * @param {number} alpha - The alpha value for alpha-beta pruning.
 * @param {number} beta - The beta value for alpha-beta pruning.
 * @param {boolean} isMaximizing - Indicates if it's the maximizing player's turn.
 * @returns {number} The best score for the current player.
 */
export default function minimax(
	board: string[][],
	depth: number,
	alpha: number,
	beta: number,
	isMaximizing: boolean
): number {
	const player: string = 'x';
	const opponent: string = 'o';

	const score: number = evaluate(board);

	if (score === 10) return score - depth;
	if (score === -10) return score + depth;
	if (!isMovesLeft(board)) return 0;

	if (isMaximizing) {
		let best: number = MIN_SCORE;

		for (let i: number = 0; i < BOARD_SIZE; i++) {
			for (let j: number = 0; j < BOARD_SIZE; j++) {
				if (board[i][j] === '') {
					board[i][j] = opponent;
					best = Math.max(best, minimax(board, depth + 1, alpha, beta, false));
					board[i][j] = '';
					alpha = Math.max(alpha, best);
					if (beta <= alpha) break; // Beta cut-off
				}
			}
		}

		return best;
	} else {
		let best: number = MAX_SCORE;

		for (let i: number = 0; i < BOARD_SIZE; i++) {
			for (let j: number = 0; j < BOARD_SIZE; j++) {
				if (board[i][j] === '') {
					board[i][j] = player;
					best = Math.min(best, minimax(board, depth + 1, alpha, beta, true));
					board[i][j] = '';
					beta = Math.min(beta, best);
					if (beta <= alpha) break; // Alpha cut-off
				}
			}
		}

		return best;
	}
}
