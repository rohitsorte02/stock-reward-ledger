-- user table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- stocks table
CREATE TABLE stocks (
    id BIGSERIAL PRIMARY KEY,
    symbol VARCHAR(20) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- reward events
CREATE TABLE reward_events (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    stock_id BIGINT NOT NULL REFERENCES stocks(id),
    quantity NUMERIC(18, 6) NOT NULL,
    rewarded_at TIMESTAMP NOT NULL,
    external_ref VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (external_ref)
);

-- ledger entries
CREATE TABLE ledger_entries (
    id BIGSERIAL PRIMARY KEY,
    reward_event_id BIGINT REFERENCES reward_events(id),
    user_id BIGINT REFERENCES users(id),
    entry_type VARCHAR(50) NOT NULL,
    stock_id BIGINT,
    stock_units NUMERIC(18, 6),
    inr_amount NUMERIC(18, 4),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- stock price
CREATE TABLE stock_prices (
    id BIGSERIAL PRIMARY KEY,
    stock_id BIGINT NOT NULL REFERENCES stocks(id),
    price_inr NUMERIC(18, 4) NOT NULL,
    captured_at TIMESTAMP NOT NULL,
    UNIQUE (stock_id, captured_at)
);