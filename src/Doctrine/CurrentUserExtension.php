<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;


class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    )
    {
        // 1. Obtenir l'utilisateur connecté
        $user = $this->security->getUser();
        // 2. Si on demande des invoices ou des customers alors, agir sur la requête pour qu'elle tienne compte de l'utilisateur connecté
        if($resourceClass === Customer::class || $resourceClass === Invoice::class)
        {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            dd($rootAlias);
        }
    }

    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        string $operationName = null,
        array $context = []
    )
    {
        // TODO: Implement applyToItem() method.
    }
}