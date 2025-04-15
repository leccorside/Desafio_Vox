<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250413011448 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ADD updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER cnpj TYPE VARCHAR(14)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER telefone DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER telefone TYPE VARCHAR(20)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER email DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN empresa.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_B8D75A50C8C6906B ON empresa (cnpj)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio ADD empresa_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio DROP empresa
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio ALTER cpf TYPE VARCHAR(11)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio ADD CONSTRAINT FK_38B65309521E1991 FOREIGN KEY (empresa_id) REFERENCES empresa (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_38B653093E3E11F0 ON socio (cpf)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_38B65309521E1991 ON socio (empresa_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_B8D75A50C8C6906B
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa DROP created_at
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa DROP updated_at
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER cnpj TYPE VARCHAR(255)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER telefone SET NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER telefone TYPE VARCHAR(255)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE empresa ALTER email SET NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio DROP CONSTRAINT FK_38B65309521E1991
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_38B653093E3E11F0
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_38B65309521E1991
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio ADD empresa VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio DROP empresa_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE socio ALTER cpf TYPE VARCHAR(255)
        SQL);
    }
}
