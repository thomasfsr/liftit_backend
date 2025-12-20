-- USERS
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(50),
  whatsapp VARCHAR(20),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
  message VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- CONSTRAINT fk_messages_user
  --   FOREIGN KEY (user_id)
  --   REFERENCES users(id)
  --   ON DELETE CASCADE
);

-- WORKOUT SESSIONS
CREATE TABLE IF NOT EXISTS workout_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- CONSTRAINT fk_sessions_user
  --   FOREIGN KEY (user_id)
  --   REFERENCES users(id)
  --   ON DELETE CASCADE
);

-- WORKOUT SETS
CREATE TABLE IF NOT EXISTS workout_sets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  session_id INTEGER,
  exercise VARCHAR(100),
  weight INTEGER,
  reps INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- CONSTRAINT fk_sets_user
    -- FOREIGN KEY (user_id)
    -- REFERENCES users(id)
    -- ON DELETE CASCADE,

  -- CONSTRAINT fk_sets_session
  --   FOREIGN KEY (session_id)
  --   REFERENCES workout_sessions(id)
  --   ON DELETE CASCADE
);

