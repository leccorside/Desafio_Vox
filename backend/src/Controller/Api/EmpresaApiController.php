<?php

namespace App\Controller\Api;

use App\Entity\Empresa;
use App\Repository\EmpresaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class EmpresaApiController extends AbstractController
{
    #[Route('/empresas', name: 'api_empresas', methods: ['GET'])]
    public function index(EmpresaRepository $empresaRepository): JsonResponse
    {
        $empresas = $empresaRepository->findAll();

        $data = array_map(function ($empresa) {
            return [
                'id' => $empresa->getId(),
                'nome' => $empresa->getNome(),
                'cnpj' => $empresa->getCnpj(),
                'telefone' => $empresa->getTelefone(),
                'email' => $empresa->getEmail(),
                'createdAt' => $empresa->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updatedAt' => $empresa->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ];
        }, $empresas);

        return $this->json($data);
    }

    #[Route('/empresas/{id}', name: 'api_get_empresa', methods: ['GET'])]
    public function show(int $id, EmpresaRepository $empresaRepository): JsonResponse
    {
        $empresa = $empresaRepository->find($id);

        if (!$empresa) {
            return $this->json(['error' => 'Empresa não encontrada'], 404);
        }

        return $this->json([
            'id' => $empresa->getId(),
            'nome' => $empresa->getNome(),
            'cnpj' => $empresa->getCnpj(),
            'telefone' => $empresa->getTelefone(),
            'email' => $empresa->getEmail(),
            'createdAt' => $empresa->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updatedAt' => $empresa->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ]);
    }

    #[Route('/empresas/{id}', name: 'api_edit_empresa', methods: ['PUT'])]
    public function edit(
        int $id,
        Request $request,
        EmpresaRepository $empresaRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $empresa = $empresaRepository->find($id);

        if (!$empresa) {
            return $this->json(['error' => 'Empresa não encontrada'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['nome'])) {
            $empresa->setNome($data['nome']);
        }

        if (isset($data['cnpj'])) {
            $empresa->setCnpj($data['cnpj']);
        }

        if (isset($data['telefone'])) {
            $empresa->setTelefone($data['telefone']);
        }

        if (isset($data['email'])) {
            $empresa->setEmail($data['email']);
        }

        $empresa->setUpdatedAt(new \DateTime());
        $entityManager->persist($empresa);
        $entityManager->flush();

        return $this->json([
            'message' => 'Empresa atualizada com sucesso',
            'empresa' => [
                'id' => $empresa->getId(),
                'nome' => $empresa->getNome(),
                'cnpj' => $empresa->getCnpj(),
                'telefone' => $empresa->getTelefone(),
                'email' => $empresa->getEmail(),
                'createdAt' => $empresa->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updatedAt' => $empresa->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    #[Route('/empresas/{id}', name: 'api_delete_empresa', methods: ['DELETE'])]
    public function delete(
        int $id,
        EmpresaRepository $empresaRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $empresa = $empresaRepository->find($id);

        if (!$empresa) {
            return $this->json(['error' => 'Empresa não encontrada'], 404);
        }

        $entityManager->remove($empresa);
        $entityManager->flush();

        return $this->json(['message' => 'Empresa excluída com sucesso']);
    }

    #[Route('/empresas', name: 'api_create_empresa', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $empresa = new Empresa();
        $empresa->setNome($data['nome']);
        $empresa->setCnpj($data['cnpj']);
        $empresa->setTelefone($data['telefone']);
        $empresa->setEmail($data['email']);

        $entityManager->persist($empresa);
        $entityManager->flush();

        return $this->json([
            'message' => 'Empresa criada com sucesso',
            'empresa' => [
                'id' => $empresa->getId(),
                'nome' => $empresa->getNome(),
                'cnpj' => $empresa->getCnpj(),
                'telefone' => $empresa->getTelefone(),
                'email' => $empresa->getEmail(),
            ],
        ]);
    }
}
