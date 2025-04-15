<?php

namespace App\Controller\Api;

use App\Entity\Socio;
use App\Repository\SocioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\EmpresaRepository; // Adicione essa linha para importar a classe EmpresaRepository

#[Route('/api')]
class SocioApiController extends AbstractController
{
    #[Route('/socios', name: 'api_socios', methods: ['GET'])]
    public function index(SocioRepository $socioRepository): JsonResponse
    {
        $socios = $socioRepository->findAll();

        $data = array_map(function ($socio) {
            return [
                'id' => $socio->getId(),
                'nome' => $socio->getNome(),
                'cpf' => $socio->getCpf(),
                'empresa' => $socio->getEmpresa() ? [
                    'id' => $socio->getEmpresa()->getId(),
                    'nome' => $socio->getEmpresa()->getNome(),
                    'cnpj' => $socio->getEmpresa()->getCnpj()
                ] : null,
            ];
        }, $socios);

        return $this->json($data);
    }

    #[Route('/socios/{id}', name: 'api_get_socio', methods: ['GET'])]
    public function show(int $id, SocioRepository $socioRepository): JsonResponse
    {
        $socio = $socioRepository->find($id);

        if (!$socio) {
            return $this->json(['error' => 'Sócio não encontrado'], 404);
        }

        return $this->json([
            'id' => $socio->getId(),
            'nome' => $socio->getNome(),
            'cpf' => $socio->getCpf(),
            'empresa' => $socio->getEmpresa() ? [
                'id' => $socio->getEmpresa()->getId(),
                'nome' => $socio->getEmpresa()->getNome(),
                'cnpj' => $socio->getEmpresa()->getCnpj()
            ] : null,
        ]);
    }

    #[Route('/socios/{id}', name: 'api_edit_socio', methods: ['PUT'])]
    public function edit(
        int $id,
        Request $request,
        SocioRepository $socioRepository,
        EmpresaRepository $empresaRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $socio = $socioRepository->find($id);

        if (!$socio) {
            return $this->json(['error' => 'Sócio não encontrado'], 404);
        }

        $data = json_decode($request->getContent(), true);

        // Atualiza o campo nome
        if (isset($data['nome'])) {
            $socio->setNome($data['nome']);
        }

        // Atualiza o campo CPF
        if (isset($data['cpf'])) {
            $socio->setCpf($data['cpf']);
        }

        // Atualiza o campo empresa (associação)
        if (isset($data['empresa'])) {
            $empresa = $empresaRepository->find($data['empresa']);
            if (!$empresa) {
                return $this->json(['error' => 'Empresa não encontrada'], 404);
            }
            $socio->setEmpresa($empresa);
        }

        // Salva as alterações
        $entityManager->persist($socio);
        $entityManager->flush();

        return $this->json([
            'message' => 'Sócio atualizado com sucesso',
            'socio' => [
                'id' => $socio->getId(),
                'nome' => $socio->getNome(),
                'cpf' => $socio->getCpf(),
                'empresa' => [
                    'id' => $socio->getEmpresa()->getId(),
                    'nome' => $socio->getEmpresa()->getNome(),
                ],
            ],
        ]);
    }


    #[Route('/socios/{id}', name: 'api_delete_socio', methods: ['DELETE'])]
    public function delete(
        int $id,
        SocioRepository $socioRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $socio = $socioRepository->find($id);

        if (!$socio) {
            return $this->json(['error' => 'Sócio não encontrado'], 404);
        }

        $entityManager->remove($socio);
        $entityManager->flush();

        return $this->json(['message' => 'Sócio excluído com sucesso']);
    }


    #[Route('/socios', name: 'api_create_socio', methods: ['POST'])]
    public function create(
        Request $request,
        EmpresaRepository $empresaRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['empresa']) || empty($data['empresa'])) {
            return $this->json(['error' => 'Empresa é obrigatória'], 400);
        }
    
        $empresa = $empresaRepository->find($data['empresa']);
        if (!$empresa) {
            return $this->json(['error' => 'Empresa não encontrada'], 404);
        }
    
        $socio = new Socio();
        $socio->setNome($data['nome']);
        $socio->setCpf($data['cpf']);
        $socio->setEmpresa($empresa);
    
        $entityManager->persist($socio);
        $entityManager->flush();
    
        return $this->json([
            'message' => 'Sócio criado com sucesso',
            'socio' => [
                'id' => $socio->getId(),
                'nome' => $socio->getNome(),
                'cpf' => $socio->getCpf(),
                'empresa' => [
                    'id' => $empresa->getId(),
                    'nome' => $empresa->getNome()
                ]
            ],
        ]);
    }
    



}
