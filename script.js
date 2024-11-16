document.addEventListener('DOMContentLoaded', () => {
    let board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    });

    const game = new Chess();

    function handleMove(source, target) {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q', // Always promote to a queen for simplicity
        });

        if (move === null) return 'snapback'; // Illegal move
        window.setTimeout(makeComputerMove, 500); // Let the computer play
    }

    function makeComputerMove() {
        const possibleMoves = game.moves();
        if (possibleMoves.length === 0) return;

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        game.move(randomMove);
        board.position(game.fen());
    }

    // Play Again Button
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset();
        board.start();
    });
});
