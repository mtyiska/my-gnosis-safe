DROP TABLE IF EXISTS multisig_wallets;
DROP TABLE IF EXISTS multisig_transactions;
DROP TABLE IF EXISTS multisig_users;
DROP TABLE IF EXISTS wallet_transactions;

CREATE TABLE multisig_users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    address VARCHAR(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(user_id)
);


CREATE TABLE multisig_wallets (
    wallet_id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid NOT NULL,
    walletname VARCHAR(255),
    created_at  timestamp NOT NULL DEFAULT NOW(),
    updated_at  timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY(wallet_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES multisig_users (user_id)
);


CREATE TABLE multisig_transactions (
    transaction_id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid NOT NULL,
    destination VARCHAR(255) NOT NULL,
    transaction_value INTEGER NOT NULL,
    created_at  timestamp NOT NULL DEFAULT NOW(),
    updated_at  timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY(transaction_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES multisig_users (user_id)
);

CREATE TABLE wallet_transactions (
    wallet_transaction_id uuid DEFAULT uuid_generate_v4 (),
    transaction_id uuid NOT NULL,
    wallet_id uuid NOT NULL,
    created_at  timestamp NOT NULL DEFAULT NOW(),
    updated_at  timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY(wallet_transaction_id),
    CONSTRAINT fk_transaction_id FOREIGN KEY (wallet_id) REFERENCES multisig_wallets (wallet_id),
    CONSTRAINT fk_wallet_id FOREIGN KEY (transaction_id) REFERENCES multisig_transactions (transaction_id)
);