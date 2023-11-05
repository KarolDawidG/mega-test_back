const insertRoot = `INSERT INTO accounts (id, username, password, email, role, is_active) VALUES (UUID(), 'root', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'root@gmail.com', 'admin', '1');`;

const findRoot = `SELECT id FROM accounts WHERE username = 'root'`;

const createAccounts = `
    CREATE TABLE IF NOT EXISTS accounts (
      id varchar(36) NOT NULL,
      username varchar(50) NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(100) NOT NULL,
      role varchar(20) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      is_active BOOLEAN DEFAULT false,
      UNIQUE KEY (username),
      UNIQUE KEY (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    `;

const createQuizData = `
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        optionA TEXT NOT NULL,
        optionB TEXT NOT NULL,
        optionC TEXT NOT NULL,
        correctAnswer CHAR(1) NOT NULL
      );  
  `;

const deleteNotActiveAccount = `
    CREATE EVENT IF NOT EXISTS delete_inactive_users
      ON SCHEDULE EVERY 15 MINUTE
      DO
      BEGIN
        DELETE FROM accounts WHERE is_active = false AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) >= 15;
      END;
`;

const event_schedulerON = `SET GLOBAL event_scheduler = ON;
`;

const testing_data = `INSERT INTO accounts (id, username, password, email, role, is_active) VALUES
(UUID(), 'user1', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user1@gmail.com', 'user', '1'),
(UUID(), 'user2', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user2@gmail.com', 'user', '1'),
(UUID(), 'user3', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user3@gmail.com', 'user', '1'),
(UUID(), 'user4', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user4@gmail.com', 'user', '1'),
(UUID(), 'user5', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user5@gmail.com', 'user', '1'),
(UUID(), 'user6', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user6@gmail.com', 'user', '1'),
(UUID(), 'user7', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user7@gmail.com', 'user', '1'),
(UUID(), 'user8', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user8@gmail.com', 'user', '1'),
(UUID(), 'user9', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user9@gmail.com', 'user', '1'),
(UUID(), 'user10', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user10@gmail.com', 'user', '1'),
(UUID(), 'user11', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user11@gmail.com', 'user', '1'),
(UUID(), 'user12', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user12@gmail.com', 'user', '1'),
(UUID(), 'user13', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user13@gmail.com', 'user', '1'),
(UUID(), 'user14', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user14@gmail.com', 'user', '1'),
(UUID(), 'user15', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user15@gmail.com', 'user', '1'),
(UUID(), 'user16', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user16@gmail.com', 'user', '1'),
(UUID(), 'user17', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user17@gmail.com', 'user', '1'),
(UUID(), 'user18', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user18@gmail.com', 'user', '1'),
(UUID(), 'user19', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user19@gmail.com', 'user', '1'),
(UUID(), 'user20', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'user20@gmail.com', 'user', '1');
`;

module.exports = {
  insertRoot,
  findRoot,
  createAccounts,
  deleteNotActiveAccount,
  event_schedulerON,
  testing_data,
  createQuizData,
};
