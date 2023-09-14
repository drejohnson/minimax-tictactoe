import minimax from '$lib/minimax';

const PLAYER_O = 'o';

/**
 * Find the best move for the opponent using the minimax algorithm.
 *
 * @param {string[][]} board - The current game board.
 * @returns {{ row: number; col: number }} The best move coordinates.
 */
export default function findBestMove(board: string[][]): { row: number; col: number } {
	let bestMove = { row: -1, col: -1 };
	let bestVal = -Infinity;
	let alpha = -Infinity;
	const beta = Infinity;

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] === '') {
				board[row][col] = PLAYER_O;
				const moveVal = minimax(board, 0, alpha, beta, false); // Provide depth, alpha, beta, and isMaximizing
				board[row][col] = '';

				if (moveVal > bestVal) {
					bestVal = moveVal;
					bestMove = { row, col };
				}

				alpha = Math.max(alpha, bestVal);
				if (beta <= alpha) break; // Beta cut-off
			}
		}
	}

	return bestMove;
}
