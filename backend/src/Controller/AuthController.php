<?php

namespace App\Controller;

use App\Repository\UsuarioRepository; // Repositório da entidade Usuario
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        UsuarioRepository $usuarioRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validação dos dados
        if (!isset($data['email']) || !isset($data['senha'])) {
            return $this->json(['error' => 'E-mail e senha são obrigatórios!'], 400);
        }

        // Busca o usuário pelo e-mail
        $usuario = $usuarioRepository->findOneBy(['email' => $data['email']]);

        if (!$usuario) {
            return $this->json(['error' => 'Credenciais inválidas!'], 401);
        }

        // Verifica a senha
        if (!$passwordHasher->isPasswordValid($usuario, $data['senha'])) {
            return $this->json(['error' => 'Credenciais inválidas!'], 401);
        }

        // Gera um token de autenticação simples (apenas como exemplo)
        $token = bin2hex(random_bytes(32)); // Gera um token aleatório

        return $this->json([
            'message' => 'Login realizado com sucesso!',
            'token' => $token, // Retorna o token
            'usuario' => [
                'id' => $usuario->getId(),
                'nome' => $usuario->getNome(),
                'email' => $usuario->getEmail(),
                'roles' => $usuario->getRoles() // Inclui os papéis do usuário
            ]
        ]);
    }
}
