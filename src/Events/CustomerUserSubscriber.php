<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterface
{

    private $security;
    /**
     * @var User $user
     */
    private $user;

    public function __construct(Security $security)
    {
        $this->security = $security;
        $this->user = $security->getUser();
    }

    public static function getSubscribedEvents()
    {
        return [
          KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(ViewEvent $event)
    {
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if($customer instanceof Customer && $method === "POST")
        {
            // Obtenir l'utilisateur actuellement connecté
            /**
             * @var User $user
             */
            $user = $this->security->getUser();

            // Assigner l'utilisateur au Customer en cours de création
            $customer->setUser($user);
        }
    }
}