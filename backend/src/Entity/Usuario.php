<?php

namespace App\Entity;

use App\Repository\UsuarioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UsuarioRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'Já existe um usuário cadastrado com este email.')]
class Usuario implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "O nome do usuário não pode estar vazio.")]
    private ?string $nome = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotBlank(message: "O email não pode estar vazio.")]
    #[Assert\Email(message: "O email '{{ value }}' não é válido.")]
    private ?string $email = null;

    #[ORM\Column]
    #[Assert\NotBlank(message: "A senha não pode estar vazia.")]
    #[Assert\Length(
        min: 6,
        max: 4096,
        minMessage: "A senha deve ter no mínimo {{ limit }} caracteres."
    )]
    private ?string $senha = null;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    public function __construct()
    {
        //$this->roles = ['ROLE_USER']; // Inicializa com o papel padrão
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNome(): ?string
    {
        return $this->nome;
    }

    public function setNome(string $nome): static
    {
        $this->nome = $nome;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getSenha(): ?string
    {
        return $this->senha;
    }

    public function setSenha(string $senha): static
    {
        $this->senha = $senha;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->getSenha();
    }

    public function getUserIdentifier(): string
    {
        return $this->getEmail(); // Retorna o identificador único (o e-mail)
    }

    public function getRoles(): array
    {
        $roles = $this->roles;



        return $roles;
    }

    public function setRoles(array $roles): static
    {
        $this->roles = array_unique($roles); // Remove valores duplicados do array
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Limpe dados sensíveis aqui, se necessário
    }
}
