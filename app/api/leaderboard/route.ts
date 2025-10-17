import { NextResponse } from 'next/server';
import { createClient } from 'redis';
import { Filter } from 'bad-words';

const LEADERBOARD_KEY = 'snake-game:leaderboard';
const filter = new Filter();

interface LeaderboardEntry {
  name: string;
  score: number;
  timestamp: number;
}

// Create Redis client
let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redis) {
    redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
  }
  return redis;
}

// Read leaderboard from Redis
async function readLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const client = await getRedisClient();
    const data = await client.get(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    return [];
  }
}

// Write leaderboard to Redis
async function writeLeaderboard(entries: LeaderboardEntry[]) {
  try {
    const client = await getRedisClient();
    await client.set(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error writing leaderboard:', error);
  }
}

// GET - Retrieve leaderboard
export async function GET() {
  const leaderboard = await readLeaderboard();

  // Sort by score (descending) and return top 10
  const topScores = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return NextResponse.json(topScores);
}

// POST - Add new score
export async function POST(request: Request) {
  try {
    const { name, score } = await request.json();

    // Validate input
    if (!name || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // Validate score is realistic
    // Grid is 25x50 = 1250 cells, so theoretical max is ~12,500 points
    // Set practical limit to 10,000 to allow for high scores but block obvious fakes
    const MAX_SCORE = 10000;
    const POINTS_PER_FOOD = 10;

    if (score <= 0 || score > MAX_SCORE) {
      return NextResponse.json(
        { error: 'Invalid score' },
        { status: 400 }
      );
    }

    // Score must be divisible by pointsPerFood (10)
    if (score % POINTS_PER_FOOD !== 0) {
      return NextResponse.json(
        { error: 'Invalid score' },
        { status: 400 }
      );
    }

    // Sanitize name (max 16 chars, alphanumeric and spaces only)
    const sanitizedName = name.trim().slice(0, 16).replace(/[^a-zA-Z0-9 ]/g, '');

    if (!sanitizedName) {
      return NextResponse.json(
        { error: 'Invalid name' },
        { status: 400 }
      );
    }

    // Check for profanity
    if (filter.isProfane(sanitizedName)) {
      return NextResponse.json(
        { error: 'Unable to submit - name contains inappropriate language' },
        { status: 400 }
      );
    }

    const leaderboard = await readLeaderboard();

    // Add new entry
    const newEntry: LeaderboardEntry = {
      name: sanitizedName,
      score,
      timestamp: Date.now(),
    };

    leaderboard.push(newEntry);

    // Keep only top 100 scores to prevent storage from growing too large
    const topScores = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);

    await writeLeaderboard(topScores);

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('Error processing leaderboard entry:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
