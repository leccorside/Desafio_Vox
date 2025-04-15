<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250413010717 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE empresa (id SERIAL NOT NULL, nome VARCHAR(255) NOT NULL, cnpj VARCHAR(255) NOT NULL, telefone VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE socio (id SERIAL NOT NULL, nome VARCHAR(255) NOT NULL, cpf VARCHAR(255) NOT NULL, empresa VARCHAR(255) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE usuario (id SERIAL NOT NULL, nome VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, senha VARCHAR(255) NOT NULL, roles VARCHAR(255) NOT NULL, PRIMARY KEY(id))
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE empresa
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE socio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE usuario
        SQL);
    }
}
