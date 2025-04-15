
# Sistema de Gerenciamento de Usuários, Empresas e Sócios

Projeto Full Stack utilizando Symfony (Backend) e Angular (Frontend), com banco de dados PostgreSQL, autenticação, permissionamento e API REST. O projeto realiza operações de CRUD para Usuários, Empresas e Sócios (vinculados às Empresas).

## 📁 Estrutura do Projeto

```
/seu-repositorio/
├── backend/     # Projeto Symfony
└── frontend/    # Projeto Angular
```

---

## ⚙️ Requisitos

- PHP >= 7.4
- Composer
- Node.js e NPM
- Angular CLI
- PostgreSQL
- Symfony CLI

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://gitlab.com/leccorside/desafio-vox.git
cd seu-repositorio
```

### 2. Backend (Symfony)

```bash
cd backend
composer install
```

Edite o arquivo `.env` com as credenciais do PostgreSQL:

```dotenv
DATABASE_URL="postgresql://postgres:020469@localhost:5432/crud_empresas"
```

Crie o banco de dados e rode as migrations:

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load --no-interaction
```

Inicie o servidor Symfony:

```bash
symfony server:start
```

Ou

```bash
php -S 127.0.0.1:8000 -t public
```

> Por padrão, a API estará disponível em: `http://127.0.0.1:8000`

#### 📘 Documentação da API

Acesse a documentação interativa da API gerada com NelmioApiDoc:

[http://127.0.0.1:8000/api/doc](http://127.0.0.1:8000/api/doc)

---

### 3. Frontend (Angular)

```bash
cd ../frontend
npm install
ng serve
```

O frontend estará disponível em:

[http://localhost:4200](http://localhost:4200)

---

## 🔐 Funcionalidades

- Autenticação via token
- Diferenciação de usuários por roles (`administrador`, `usuario`)
- CRUD completo de:
  - Usuários
  - Empresas
  - Sócios (relacionados a Empresas)
- Interface Angular com controle de rotas por permissões

---

## 📦 Requisitos

- Git
- PHP 7.4 ou superior
- Composer
- PostgreSQL
- Node.js 20+ e npm
- Angular CLI (npm install -g @angular/cli)
- Symfony CLI

---

## 👤 Usuários de Teste

No carregamento de dados fictícios (`fixtures`), são criados:

- **Administrador**
  - Email: `admin@admin.com`
  - Senha: `admin123456`
- **Usuário Comum**
  - Email: `user@user.com`
  - Senha: `user123456`

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 📌 Observações

O CORS já está configurado para funcionar com o Angular em localhost.
O Angular consome a API do Symfony usando HttpClient.
