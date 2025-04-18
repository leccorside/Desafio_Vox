<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Form\UsuarioType;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/usuario')]
class UsuarioController extends AbstractController
{
    #[Route(name: 'app_usuario_index', methods: ['GET'])]
    public function index(UsuarioRepository $usuarioRepository): Response
    {
        return $this->render('usuario/index.html.twig', [
            'usuarios' => $usuarioRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_usuario_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $usuario = new Usuario();
        $form = $this->createForm(UsuarioType::class, $usuario);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                // Captura o valor do campo 'roles' manualmente e converte para array
                $role = $form->get('roles')->getData();
                $usuario->setRoles([$role]);

                try {
                    $entityManager->persist($usuario);
                    $entityManager->flush();

                    return $this->redirectToRoute('app_usuario_index', [], Response::HTTP_SEE_OTHER);
                } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
                    $this->addFlash('danger', 'Já existe um usuário cadastrado com este email.');
                }
            } else {
                $this->addFlash('danger', 'Por favor, corrija os erros no formulário.');
            }
        }

        return $this->render('usuario/new.html.twig', [
            'usuario' => $usuario,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_usuario_show', methods: ['GET'])]
    public function show(Usuario $usuario): Response
    {
        return $this->render('usuario/show.html.twig', [
            'usuario' => $usuario,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_usuario_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Usuario $usuario, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UsuarioType::class, $usuario);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                // Captura o valor do campo 'roles' manualmente e converte para array
                $role = $form->get('roles')->getData();
                $usuario->setRoles([$role]);

                try {
                    $entityManager->flush();

                    return $this->redirectToRoute('app_usuario_index', [], Response::HTTP_SEE_OTHER);
                } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
                    $this->addFlash('danger', 'Já existe um usuário cadastrado com este email.');
                }
            } else {
                $this->addFlash('danger', 'Por favor, corrija os erros no formulário.');
            }
        }

        return $this->render('usuario/edit.html.twig', [
            'usuario' => $usuario,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_usuario_delete', methods: ['POST'])]
    public function delete(Request $request, Usuario $usuario, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$usuario->getId(), $request->request->get('_token'))) {
            $entityManager->remove($usuario);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_usuario_index', [], Response::HTTP_SEE_OTHER);
    }
}
