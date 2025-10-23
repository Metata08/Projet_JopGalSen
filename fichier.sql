-- ============================================
-- TABLES MYSQL
-- ============================================

-- Table des utilisateurs
CREATE TABLE utilisateurs (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar TEXT,
  phone VARCHAR(50),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des rôles utilisateurs
CREATE TABLE user_roles (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  role ENUM('admin', 'candidat', 'recruteur') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_role (user_id, role),
  FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table des entreprises
CREATE TABLE entreprises (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(255) NOT NULL,
  size VARCHAR(50) NOT NULL,
  status ENUM('verified', 'pending') DEFAULT 'pending',
  description TEXT,
  logo TEXT,
  website VARCHAR(255),
  location VARCHAR(255),
  owner_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table des offres d'emploi
CREATE TABLE jobs (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  salary_range VARCHAR(100),
  location VARCHAR(255),
  contract_type VARCHAR(100),
  status ENUM('active', 'pending', 'expired') DEFAULT 'pending',
  entreprise_id CHAR(36) NOT NULL,
  recruteur_id CHAR(36) NOT NULL,
  published_date TIMESTAMP NULL,
  expiry_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entreprise_id) REFERENCES entreprises(id) ON DELETE CASCADE,
  FOREIGN KEY (recruteur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table des candidatures
CREATE TABLE candidatures (
  id CHAR(36) PRIMARY KEY,
  candidate_id CHAR(36) NOT NULL,
  job_id CHAR(36) NOT NULL,
  status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
  cover_letter TEXT,
  resume_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_candidate_job (candidate_id, job_id),
  FOREIGN KEY (candidate_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Table des messages
CREATE TABLE messages (
  id CHAR(36) PRIMARY KEY,
  sender_id CHAR(36) NOT NULL,
  receiver_id CHAR(36) NOT NULL,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table des activités
CREATE TABLE activities (
  id CHAR(36) PRIMARY KEY,
  type ENUM('user', 'job', 'company', 'application') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  user_id CHAR(36),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);
