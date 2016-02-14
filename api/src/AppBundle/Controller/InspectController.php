<?php

namespace AppBundle\Controller;

use JMS\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Tolerance\Viewer\InspectionRequest;
use Tolerance\Viewer\Inspector;

/**
 * @Route(service="app.controller.inspect")
 */
class InspectController extends Controller
{
    /**
     * @var Inspector
     */
    private $inspector;

    /**
     * @var SerializerInterface
     */
    private $serializer;

    /**
     * @param Inspector $inspector
     * @param SerializerInterface $serializer
     */
    public function __construct(Inspector $inspector, SerializerInterface $serializer)
    {
        $this->inspector = $inspector;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/inspection", methods={"GET"})
     * @ParamConverter("request", converter="inspection_request")
     */
    public function indexAction(InspectionRequest $request)
    {
        $inspection = $this->inspector->inspect($request);

        return new Response(
            $this->serializer->serialize($inspection, 'json'),
            200,
            [
                'Content-Type' => 'application/json',
            ]
        );
    }
}
