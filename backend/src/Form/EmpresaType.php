<?php

namespace App\Form;

use App\Entity\Empresa;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class EmpresaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nome', TextType::class, [
                'label' => 'Nome',
            ])
            ->add('cnpj', TextType::class, [
                'label' => 'CNPJ',
            ])
            ->add('telefone', TextType::class, [
                'label' => 'Telefone',
            ])
            ->add('email', TextType::class, [
                'label' => 'Email',
            ]);
        // Retirando createdAt e updatedAt, pois não devem ser manipulados diretamente
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Empresa::class,
        ]);
    }
}
