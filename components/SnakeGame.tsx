'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onGameComplete?: () => void;
  config?: Partial<GameConfig>;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  timestamp: number;
}

export interface GameConfig {
  // Grid dimensions
  gridWidth: number;
  gridHeight: number;
  cellSize: number; // Base cell size in pixels

  // Game behavior
  gameSpeed: number; // Milliseconds between moves (lower = faster)
  pointsPerFood: number;
  completionScore: number; // Score needed to trigger onGameComplete
  opacityDecrement: number; // How much opacity decreases per segment (0.02 = 2%)
  minOpacity: number; // Minimum opacity for tail segments

  // Visual styling
  snakeColor: string; // RGB color for snake
  foodColor: string; // Tailwind class for food
  gridBackgroundColor: string; // Tailwind class for grid background
  containerBackgroundColor: string; // Tailwind class for container
  headRounding: string; // Tailwind rounding class
  segmentOverlap: number; // Pixels to overlap segments for smooth appearance

  // UI dimensions
  sidebarWidth: string; // Width of control sidebar
  containerPadding: string; // Padding class
  containerGap: string; // Gap class
  borderRadius: string; // Border radius class

  // Features
  enableLeaderboard: boolean;
  maxNameLength: number;
  leaderboardSize: number; // Number of entries to display
}

// Default configuration
const DEFAULT_CONFIG: GameConfig = {
  // Grid dimensions
  gridWidth: 25,
  gridHeight: 50,
  cellSize: 10,

  // Game behavior
  gameSpeed: 100,
  pointsPerFood: 10,
  completionScore: 100,
  opacityDecrement: 0.01,
  minOpacity: 0.2,

  // Visual styling
  snakeColor: '67 217 173',
  foodColor: 'bg-accent-secondary',
  gridBackgroundColor: 'bg-background',
  containerBackgroundColor: 'bg-background-dark',
  headRounding: 'rounded-sm',
  segmentOverlap: 1,

  // UI dimensions
  sidebarWidth: '248px',
  containerPadding: 'p-6',
  containerGap: 'gap-6',
  borderRadius: 'rounded-lg',

  // Features
  enableLeaderboard: true,
  maxNameLength: 16,
  leaderboardSize: 10,
};

export default function SnakeGame({
  onGameComplete,
  config: userConfig,
}: SnakeGameProps) {
  // Merge user config with defaults
  const config = { ...DEFAULT_CONFIG, ...userConfig };

  // Calculate initial positions based on grid size
  const INITIAL_SNAKE = [
    {
      x: Math.floor(config.gridWidth / 2),
      y: Math.floor(config.gridHeight / 2),
    },
  ];
  const INITIAL_FOOD = {
    x: Math.floor(config.gridWidth / 4),
    y: Math.floor(config.gridHeight / 4),
  };
  const INITIAL_DIRECTION = { x: 0, y: -1 };

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [directionQueue, setDirectionQueue] = useState<Position[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setDirectionQueue([]);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    setPaused(false);
    setShowNameInput(false);
    setPlayerName('');
    setHasSubmittedScore(false);
  }, [INITIAL_SNAKE, INITIAL_FOOD, INITIAL_DIRECTION]);

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);

    try {
      const response = await fetch('/api/leaderboard');

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const submitScore = async () => {
    if (!playerName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName,
          score,
        }),
      });

      if (response.ok) {
        setShowNameInput(false);
        setHasSubmittedScore(true);
        fetchLeaderboard(); // Refresh leaderboard after submission
      } else {
        const data = await response.json();
        setSubmitError(data.error || 'Failed to submit score');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      setSubmitError('Failed to submit score');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateFood = useCallback(
    (snakeBody: Position[]): Position => {
      const newFood: Position = {
        x: Math.floor(Math.random() * config.gridWidth),
        y: Math.floor(Math.random() * config.gridHeight),
      };

      if (
        snakeBody.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      ) {
        return generateFood(snakeBody);
      }

      return newFood;
    },
    [config.gridWidth, config.gridHeight]
  );

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || isPaused) return;

    setSnake((currentSnake) => {
      // Get next direction from queue if available
      setDirectionQueue((queue) => {
        if (queue.length > 0) {
          const nextDir = queue[0];
          setDirection(nextDir);
          return queue.slice(1);
        }
        return queue;
      });

      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= config.gridWidth ||
        head.y < 0 ||
        head.y >= config.gridHeight
      ) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision (skip the first segment which is the old head position)
      if (
        newSnake
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + config.pointsPerFood);
        setFood(generateFood(newSnake));

        // Check if game is complete (score threshold or can customize)
        if (score + config.pointsPerFood >= config.completionScore) {
          onGameComplete?.();
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [
    direction,
    food,
    gameOver,
    gameStarted,
    isPaused,
    generateFood,
    onGameComplete,
    score,
    config.gridWidth,
    config.gridHeight,
    config.pointsPerFood,
    config.completionScore,
  ]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!gameStarted) {
        if (e.key === ' ') {
          setGameStarted(true);
        }
        return;
      }

      if (e.key === ' ') {
        setPaused((prev) => !prev);
        return;
      }

      if (isPaused) return;

      // Get the last direction (either from queue or current direction)
      const lastDir =
        directionQueue.length > 0
          ? directionQueue[directionQueue.length - 1]
          : direction;

      let newDirection: Position | null = null;

      switch (e.key) {
        case 'ArrowUp':
          // Only prevent if currently moving down
          if (lastDir.y !== 1) newDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          // Only prevent if currently moving up
          if (lastDir.y !== -1) newDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          // Only prevent if currently moving right
          if (lastDir.x !== 1) newDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          // Only prevent if currently moving left
          if (lastDir.x !== -1) newDirection = { x: 1, y: 0 };
          break;
      }

      if (newDirection && directionQueue.length < 2) {
        setDirectionQueue((queue) => [...queue, newDirection]);
      }
    },
    [direction, directionQueue, gameStarted, isPaused]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, config.gameSpeed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, config.gameSpeed]);

  const startGame = () => {
    setGameStarted(true);
  };

  // Calculate dimensions
  const gridPixelWidth = config.gridWidth * config.cellSize;
  const gridPixelHeight = config.gridHeight * config.cellSize;
  const cellPixelSize = config.cellSize + config.segmentOverlap;
  const cellMargin = -config.segmentOverlap / 2;

  return (
    <div
      className={`flex items-center ${config.containerGap} ${config.containerBackgroundColor} ${config.borderRadius} ${config.containerPadding} border border-border`}
    >
      <div
        className={`grid rounded ${config.gridBackgroundColor}`}
        style={{
          gridTemplateColumns: `repeat(${config.gridWidth}, ${config.cellSize}px)`,
          gridTemplateRows: `repeat(${config.gridHeight}, ${config.cellSize}px)`,
        }}
      >
        {Array.from({ length: config.gridWidth * config.gridHeight }).map(
          (_, index) => {
            const x = index % config.gridWidth;
            const y = Math.floor(index / config.gridWidth);

            const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
            const snakeSegmentIndex = snake.findIndex(
              (segment) => segment.x === x && segment.y === y
            );
            const isSnakeBody = snakeSegmentIndex !== -1;
            const isFood = food.x === x && food.y === y;

            let cellClass = 'w-2 h-2 ';
            let cellStyle: React.CSSProperties = {};

            if (isFood) {
              cellClass += `${config.foodColor} rounded-full`;
            } else if (isSnakeBody) {
              // Decrease opacity based on config
              const opacity = 1 - snakeSegmentIndex * config.opacityDecrement;

              // Make segments larger to overlap and create smooth line
              cellStyle = {
                backgroundColor: `rgb(${config.snakeColor} / ${Math.max(
                  opacity,
                  config.minOpacity
                )})`,
                width: `${cellPixelSize}px`,
                height: `${cellPixelSize}px`,
                marginTop: `${cellMargin}px`,
                marginLeft: `${cellMargin}px`,
              };

              // Only slightly round the head
              if (isSnakeHead) {
                if (direction.y === -1) {
                  cellClass += `rounded-t-${config.headRounding.replace(
                    'rounded-',
                    ''
                  )}`;
                } else if (direction.y === 1) {
                  cellClass += `rounded-b-${config.headRounding.replace(
                    'rounded-',
                    ''
                  )}`;
                } else if (direction.x === -1) {
                  cellClass += `rounded-l-${config.headRounding.replace(
                    'rounded-',
                    ''
                  )}`;
                } else if (direction.x === 1) {
                  cellClass += `rounded-r-${config.headRounding.replace(
                    'rounded-',
                    ''
                  )}`;
                }
              }
            }

            return <div key={index} className={cellClass} style={cellStyle} />;
          }
        )}
      </div>

      <div
        className='flex flex-col items-start'
        style={{ width: config.sidebarWidth, height: `${gridPixelHeight}px` }}
      >
        {!gameStarted && !gameOver ? (
          <div className='space-y-4 w-full'>
            {!showLeaderboard ? (
              <>
                <div className='text-foreground text-xs'>
                  // use keyboard
                  <br />
                  // arrows to play
                </div>
                <div className='flex flex-col items-center space-y-1'>
                  <div className='w-8 h-8 bg-border rounded flex items-center justify-center'>
                    <span className='text-foreground text-sm'>↑</span>
                  </div>
                  <div className='flex space-x-1'>
                    <div className='w-8 h-8 bg-border rounded flex items-center justify-center'>
                      <span className='text-foreground text-sm'>←</span>
                    </div>
                    <div className='w-8 h-8 bg-border rounded flex items-center justify-center'>
                      <span className='text-foreground text-sm'>↓</span>
                    </div>
                    <div className='w-8 h-8 bg-border rounded flex items-center justify-center'>
                      <span className='text-foreground text-sm'>→</span>
                    </div>
                  </div>
                </div>
                <div className='text-foreground text-sm w-32'>
                  // score: {score}
                </div>
                <button
                  onClick={startGame}
                  className='bg-accent-secondary text-background px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                >
                  start-game
                </button>
                {config.enableLeaderboard && (
                  <button
                    onClick={() => {
                      setShowLeaderboard(true);
                      fetchLeaderboard();
                    }}
                    className='bg-border text-foreground px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                  >
                    leaderboard
                  </button>
                )}
              </>
            ) : (
              <div className='space-y-3 w-full'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-foreground font-semibold text-sm'>
                    // leaderboard
                  </h3>
                  <button
                    onClick={fetchLeaderboard}
                    className='text-accent hover:underline text-xs'
                  >
                    refresh
                  </button>
                </div>

                {isLoadingLeaderboard ? (
                  <div className='text-foreground text-sm'>Loading...</div>
                ) : leaderboard.length === 0 ? (
                  <div className='text-foreground text-sm'>No scores yet!</div>
                ) : (
                  <div className='space-y-1'>
                    {leaderboard
                      .slice(0, config.leaderboardSize)
                      .map((entry, index) => (
                        <div
                          key={`${entry.name}-${entry.timestamp}`}
                          className='flex items-center justify-between bg-background rounded px-2 py-1.5 border border-border'
                        >
                          <div className='flex items-center gap-2'>
                            <span
                              className={`font-mono text-xs w-6 ${
                                index === 0
                                  ? 'text-accent-secondary'
                                  : index === 1
                                  ? 'text-accent'
                                  : index === 2
                                  ? 'text-accent-tertiary'
                                  : 'text-foreground'
                              }`}
                            >
                              #{index + 1}
                            </span>
                            <span className='text-foreground text-xs'>
                              {entry.name}
                            </span>
                          </div>
                          <span className='text-accent-tertiary font-mono text-xs'>
                            {entry.score}
                          </span>
                        </div>
                      ))}
                  </div>
                )}

                <button
                  onClick={() => setShowLeaderboard(false)}
                  className='bg-border text-foreground px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                >
                  back
                </button>
              </div>
            )}
          </div>
        ) : gameStarted ? (
          <div className='space-y-4 w-full'>
            {gameOver ? (
              <div className='space-y-3'>
                <div className='text-accent-secondary font-medium'>
                  Game Over!
                </div>
                <div className='text-foreground text-sm w-32'>
                  // score: {score}
                </div>

                {!showNameInput && !hasSubmittedScore ? (
                  <div className='space-y-2'>
                    <button
                      onClick={() => setShowNameInput(true)}
                      className='bg-accent-secondary text-background px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                    >
                      submit-score
                    </button>
                    <button
                      onClick={resetGame}
                      className='bg-border text-foreground px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                    >
                      play-again
                    </button>
                  </div>
                ) : hasSubmittedScore ? (
                  <div className='space-y-2'>
                    <div className='text-accent-tertiary text-sm'>
                      Score submitted!
                    </div>
                    <button
                      onClick={resetGame}
                      className='bg-accent-secondary text-background px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                    >
                      play-again
                    </button>
                  </div>
                ) : (
                  <div className='space-y-2'>
                    <input
                      type='text'
                      value={playerName}
                      onChange={(e) => {
                        setPlayerName(e.target.value);
                        setSubmitError('');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && submitScore()}
                      placeholder='enter name'
                      maxLength={config.maxNameLength}
                      className='w-full bg-background border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:border-accent'
                      autoFocus
                    />
                    {submitError && (
                      <div className='text-red-400 text-xs'>{submitError}</div>
                    )}
                    <button
                      onClick={submitScore}
                      disabled={!playerName.trim() || isSubmitting}
                      className='bg-accent-secondary text-background px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSubmitting ? 'submitting...' : 'submit'}
                    </button>
                    <button
                      onClick={() => {
                        setShowNameInput(false);
                        setSubmitError('');
                      }}
                      className='bg-border text-foreground px-4 py-2 rounded font-medium hover:bg-opacity-90 transition w-full'
                    >
                      cancel
                    </button>
                  </div>
                )}
              </div>
            ) : isPaused ? (
              <div className='space-y-3'>
                <div className='text-accent-secondary font-medium'>Paused</div>
                <button
                  onClick={() => setPaused(false)}
                  className='bg-accent-secondary text-background px-4 py-2 rounded font-medium hover:bg-opacity-90 transition'
                >
                  resume
                </button>
              </div>
            ) : (
              <div className='space-y-3'>
                <div className='text-foreground text-sm w-32'>
                  // score: {score}
                </div>
                <button
                  onClick={() => setPaused(true)}
                  className='bg-border text-foreground px-4 py-2 rounded font-medium hover:bg-opacity-90 transition'
                >
                  pause
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
