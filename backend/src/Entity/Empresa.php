<?php

namespace App\Entity;

use App\Repository\EmpresaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: EmpresaRepository::class)]
#[ORM\Table(name: 'empresa')]
#[UniqueEntity(fields: ['cnpj'], message: 'Já existe uma empresa cadastrada com este CNPJ.')]
class Empresa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "O nome da empresa não pode estar vazio.")]
    #[Assert\Length(
        max: 255,
        maxMessage: "O nome não pode ter mais de {{ limit }} caracteres."
    )]
    private ?string $nome = null;

    #[ORM\Column(length: 14, unique: true)]
    #[Assert\NotBlank(message: "O CNPJ não pode estar vazio.")]
    #[Assert\Length(
        min: 14,
        max: 14,
        exactMessage: "O CNPJ deve conter {{ limit }} dígitos."
    )]
    private ?string $cnpj = null;

    #[ORM\Column(length: 20, nullable: true)]
    #[Assert\Length(
        max: 20,
        maxMessage: "O telefone não pode ter mais de {{ limit }} caracteres."
    )]
    private ?string $telefone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Email(message: "O email '{{ value }}' não é válido.")]
    private ?string $email = null;

    #[ORM\Column(type: 'datetime_immutable', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTime $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'empresa', targetEntity: Socio::class, cascade: ['persist', 'remove'])]
    private Collection $socios;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->socios = new ArrayCollection();
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

    public function getCnpj(): ?string
    {
        return $this->cnpj;
    }

    public function setCnpj(string $cnpj): static
    {
        $this->cnpj = $cnpj;

        return $this;
    }

    public function getTelefone(): ?string
    {
        return $this->telefone;
    }

    public function setTelefone(?string $telefone): static
    {
        $this->telefone = $telefone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTime $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getSocios(): Collection
    {
        return $this->socios;
    }

    public function addSocio(Socio $socio): static
    {
        if (!$this->socios->contains($socio)) {
            $this->socios[] = $socio;
            $socio->setEmpresa($this);
        }

        return $this;
    }

    public function removeSocio(Socio $socio): static
    {
        if ($this->socios->removeElement($socio)) {
            if ($socio->getEmpresa() === $this) {
                $socio->setEmpresa(null);
            }
        }

        return $this;
    }
}
