<?php

namespace App\Controller\Api;

use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class UsuarioApiController extends AbstractController
{
    #[Route('/usuarios', name: 'api_usuarios', methods: ['GET'])]
    public function index(UsuarioRepository $usuarioRepository): JsonResponse
    {
        $usuarios = $usuarioRepository->findAll();

        $data = array_map(function ($usuario) {
            return [
                'id' => $usuario->getId(),
                'nome' => $usuario->getNome(),
                'email' => $usuario->getEmail(),
                'senha' => $usuario->getSenha(),
                'roles' => $usuario->getRoles(),
            ];
        }, $usuarios);

        return $this->json($data);
    }

    #[Route('/usuarios/{id}', name: 'api_get_usuario', methods: ['GET'])]
    public function show(int $id, UsuarioRepository $usuarioRepository): JsonResponse
    {
        $usuario = $usuarioRepository->find($id);

        if (!$usuario) {
            return $this->json(['error' => 'Usuário não encontrado'], 404);
        }

        return $this->json([
            'id' => $usuario->getId(),
            'nome' => $usuario->getNome(),
            'email' => $usuario->getEmail(),
            'senha' => $usuario->getSenha(),
            'roles' => $usuario->getRoles(),
        ]);
    }

    #[Route('/usuarios/{id}', name: 'api_edit_usuario', methods: ['PUT'])]
    public function edit(
        int $id,
        Request $request,
        UsuarioRepository $usuarioRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // Localiza o usuário pelo ID
        $usuario = $usuarioRepository->find($id);
    
        if (!$usuario) {
            return $this->json(['error' => 'Usuário não encontrado'], 404);
        }
    
        // Decodifica os dados da requisição
        $data = json_decode($request->getContent(), true);
    
        // Atualiza os campos do usuário, se fornecidos
        if (isset($data['nome'])) {
            $usuario->setNome($data['nome']);
        }
    
        if (isset($data['email'])) {
            $usuario->setEmail($data['email']);
        }
    
        // Atualiza a senha somente se ela for fornecida na requisição
        if (isset($data['senha']) && !empty($data['senha'])) {
            $usuario->setSenha(password_hash($data['senha'], PASSWORD_BCRYPT));
        }
    
        // Valida e atualiza roles
        if (isset($data['roles'])) {
            // Certifique-se de que o valor recebido de roles é uma array
            if (is_string($data['roles'])) {
                $data['roles'] = [$data['roles']]; // Converte string para array, se necessário
            }
        
            // Valida cada role antes de aplicar
            if (is_array($data['roles'])) {
                foreach ($data['roles'] as $role) {
                    if (!in_array($role, ['ROLE_ADMIN', 'ROLE_USER'])) {
                        return $this->json(['error' => 'Role inválido: ' . $role], 400);
                    }
                }
                $usuario->setRoles($data['roles']); // Atualiza os roles no objeto usuário
            }
        }
        
    
        // Persiste as alterações
        $entityManager->persist($usuario);
        $entityManager->flush();
    
        return $this->json([
            'message' => 'Usuário atualizado com sucesso',
            'usuario' => [
                'id' => $usuario->getId(),
                'nome' => $usuario->getNome(),
                'email' => $usuario->getEmail(),
                'roles' => $usuario->getRoles(),
            ],
        ]);
    }
    

    #[Route('/usuarios/{id}', name: 'api_delete_usuario', methods: ['DELETE'])]
    public function delete(
        int $id,
        UsuarioRepository $usuarioRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $usuario = $usuarioRepository->find($id);

        if (!$usuario) {
            return $this->json(['error' => 'Usuário não encontrado'], 404);
        }

        $entityManager->remove($usuario);
        $entityManager->flush();

        return $this->json(['message' => 'Usuário excluído com sucesso']);
    }





    #[Route('/usuarios', name: 'api_create_usuario', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $usuario = new Usuario();
        $usuario->setNome($data['nome']);
        $usuario->setEmail($data['email']);
        $usuario->setSenha(password_hash($data['senha'], PASSWORD_BCRYPT));
        $usuario->setRoles([$data['roles']]);

        $entityManager->persist($usuario);
        $entityManager->flush();

        return $this->json([
            'message' => 'Usuário criado com sucesso',
            'usuario' => [
                'id' => $usuario->getId(),
                'nome' => $usuario->getNome(),
                'email' => $usuario->getEmail(),
                'roles' => $usuario->getRoles(),
            ],
        ]);
    }

}
