<?php

namespace AppBundle\Controller;

use JMS\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Tolerance\Viewer\InspectionRequest;
use Tolerance\Viewer\Inspector;
use FOS\RestBundle\Controller\Annotations\View;

/**
 * @Route(service="app.controller.inspect")
 */
class InspectController
{
    /**
     * @var Inspector
     */
    private $inspector;

    /**
     * @param Inspector $inspector
     */
    public function __construct(Inspector $inspector)
    {
        $this->inspector = $inspector;
    }

    /**
     * @Route("/inspection", methods={"GET"})
     * @ParamConverter("request", converter="inspection_request")
     * @View
     */
    public function indexAction(InspectionRequest $request)
    {
        return $this->inspector->inspect($request);
    }
}
