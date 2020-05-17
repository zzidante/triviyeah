-- need to change single quote escapes to $$ and double single quotes `'` to only single quote
CREATE table users (
  user_id BIGSERIAL PRIMARY KEY,
  email VARCHAR CONSTRAINT basic_email_format CHECK (email ILIKE '%@%.%' AND lower(email) = email),
  username VARCHAR,
  UNIQUE(email)
);

CREATE table questions (
  question_id BIGSERIAL PRIMARY KEY,
  submitted_by_id BIGSERIAL REFERENCES users,
  clause VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL default (now() at time zone 'utc'),
  UNIQUE(clause)
);

CREATE table answers (
  answer_id BIGSERIAL PRIMARY KEY,
  clause VARCHAR NOT NULL,
  question_id BIGSERIAL REFERENCES questions,
  created_at TIMESTAMPTZ NOT NULL default (now() at time zone 'utc')
);

CREATE table topic_categories (
  topic_category_id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR NOT NULL,
  UNIQUE(category_name)
);

CREATE table questions_x_topic_categories (
  question_id BIGSERIAL REFERENCES questions,
  topic_category_id BIGSERIAL REFERENCES topic_categories
);

Create or replace function random_string(length integer) returns text as
$$
declare
  chars text[] := '{A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language plpgsql;

CREATE table games (
  game_id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL default (now() at time zone 'utc'),
  game_code VARCHAR default random_string(5),
  game_status VARCHAR 
    NOT NULL 
    DEFAULT 'pending' 
    CONSTRAINT valid_status CHECK (
      game_status IN (
        'pending', 
        'in_progress', 
        'cancelled', 
        'completed'
      )
    )
);

CREATE table game_round_questions(
  game_round_question_id BIGSERIAL PRIMARY KEY,
  game_round_id BIGSERIAL REFERENCES games,
  question_id BIGSERIAL REFERENCES questions,
  created_at TIMESTAMPTZ NOT NULL default (now() at time zone 'utc')
);

create or replace function insert_game_round_sequence_int() returns trigger as $$
declare current_max INT;
begin
    SELECT max(game_sequence) + 1 
    INTO current_max
    FROM game_rounds 
    WHERE game_id = NEW.game_id;
    
    NEW.game_sequence := coalesce(current_max, 1);
    return new;
end;
$$ language plpgsql;

CREATE table game_rounds(
  game_round_id BIGSERIAL PRIMARY KEY,
  game_sequence INT,
  game_id BIGSERIAL REFERENCES games
);

CREATE TRIGGER insert_game_round_sequence_int_trigger
BEFORE INSERT ON game_rounds
FOR EACH ROW
EXECUTE PROCEDURE insert_game_round_sequence_int();

CREATE table user_answers (
  user_answer_id BIGSERIAL PRIMARY KEY,
  user_id BIGSERIAL REFERENCES users,
  game_round_id BIGSERIAL REFERENCES game_rounds,
  outcome VARCHAR 
    NOT NULL 
    DEFAULT 'pending' 
    CONSTRAINT valid_user_answer_outcome CHECK (
      outcome IN (
        'pending', 
        'cancelled', 
        'accepted', 
        'rejected',
        'disqualified',
        'inconclusive_accepted',
        'inconclusive_rejected'
      )
    )
);

CREATE table teams (
	team_id BIGSERIAL PRIMARY KEY,
  	name VARCHAR,
  	created_at TIMESTAMPTZ NOT NULL default (now() at time zone 'utc')
);

CREATE table game_teams(
    game_id BIGSERIAL REFERENCES games,
  	team_id BIGSERIAL REFERENCES teams,
    created_at TIMESTAMPTZ NOT NULL default (now() at time zone 'utc'),
  	UNIQUE(game_id, team_id)
);

create or replace function game_team_name_unique_check() returns trigger as $$
declare name_exists := FALSE;
begin
    SELECT EXISTS(
    	SELECT 1 FROM game_teams
        JOIN games USING(game_id)
        JOIN teams USING(team_id)
        WHERE teams.name = NEW.name
        AND game_id = NEW.game_id
    ) INTO name_exists
    
    NEW.game_sequence := coalesce(current_max, 1);
    return new;
end;
$$ language plpgsql;

CREATE TRIGGER game_team_name_unique_trigger
BEFORE INSERT ON game_teams
FOR EACH ROW
EXECUTE PROCEDURE game_team_name_unique_check();

CREATE table user_x_team (
  user_id BIGSERIAL REFERENCES users,
  team_id BIGSERIAL REFERENCES teams,
  UNIQUE(user_id, team_id)
);

--
--
--
--
-- SAMPLE QUERIES
--
--
-- INSERT INTO users (email, username) VALUES ('d@d.d', 'abced') RETURNING *;
-- 
-- SELECT random_string(5);
-- 
-- WITH new_games AS ( 
--   INSERT INTO games default values RETURNING *
-- )
--   INSERT INTO game_rounds (game_id)
--   SELECT game_id FROM new_games;
-- 
-- WITH new_games AS ( 
--   INSERT INTO games default values RETURNING *
-- )
--   INSERT INTO game_rounds (game_id)
--   SELECT game_id FROM new_games;
--   
--   INSERT INTO game_rounds (game_id)
--   SELECT game_id FROM games WHERE game_id = 1;
--   
-- SELECT * FROM game_rounds;