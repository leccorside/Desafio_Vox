<?php

namespace App\Form;

use App\Entity\Usuario;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UsuarioType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nome', TextType::class, [
                'label' => 'Nome do Usuário',
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
            ])
            ->add('senha', PasswordType::class, [
                'label' => 'Senha',
            ])
            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'Administrador' => 'ROLE_ADMIN',
                    'Usuário' => 'ROLE_USER',
                ],
                'expanded' => true, // Exibe como botões de rádio
                'multiple' => false, // Permite apenas uma seleção
                'label' => 'Função',
                'mapped' => false, // Evita mapeamento automático para o campo JSON
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Usuario::class,
        ]);
    }
}
