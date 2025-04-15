<?php

namespace App\Entity;

use App\Repository\SocioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: SocioRepository::class)]
#[UniqueEntity(fields: ['cpf'], message: 'Já existe um sócio cadastrado com este CPF.')]
class Socio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "O nome do sócio não pode estar vazio.")]
    private ?string $nome = null;

    #[ORM\Column(length: 11, unique: true)]
    #[Assert\NotBlank(message: "O CPF não pode estar vazio.")]
    #[Assert\Length(
        min: 11,
        max: 11,
        exactMessage: "O CPF deve conter exatamente {{ limit }} dígitos."
    )]
    private ?string $cpf = null;

    #[ORM\ManyToOne(targetEntity: Empresa::class, inversedBy: 'socios')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Empresa $empresa = null;

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

    public function getCpf(): ?string
    {
        return $this->cpf;
    }

    public function setCpf(string $cpf): static
    {
        $this->cpf = $cpf;

        return $this;
    }

    public function getEmpresa(): ?Empresa
    {
        return $this->empresa;
    }

    public function setEmpresa(?Empresa $empresa): static
    {
        $this->empresa = $empresa;

        return $this;
    }
}
