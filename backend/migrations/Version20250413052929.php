<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250413052929 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Atualiza a coluna roles para o tipo JSON';
    }

    public function up(Schema $schema): void
    {
        // Corrige a coluna roles para o tipo JSON com conversão explícita
        $this->addSql(<<<'SQL'
            ALTER TABLE usuario ALTER COLUMN roles TYPE JSON USING roles::json
        SQL);
        
        // Cria índice único para o email
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_2265B05DE7927C74 ON usuario (email)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // Reverte a alteração da coluna roles para VARCHAR
        $this->addSql(<<<'SQL'
            ALTER TABLE usuario ALTER COLUMN roles TYPE VARCHAR(255) USING roles::text
        SQL);
        
        // Remove índice único do email
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_2265B05DE7927C74
        SQL);
    }
}
