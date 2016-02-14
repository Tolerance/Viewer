<?php

namespace AppBundle\Request\ParamConverter;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Tolerance\MessageProfile\Identifier\StringMessageIdentifier;
use Tolerance\Viewer\InspectionRequest;

class InspectionRequestConverter implements ParamConverterInterface
{
    /**
     * {@inheritdoc}
     */
    public function apply(Request $request, ParamConverter $configuration)
    {
        if (null === ($rawMessageIdentifier = $request->query->get('message_identifier'))) {
            throw new BadRequestHttpException('The `message_identifier` parameter is required');
        }

        $messageIdentifier = StringMessageIdentifier::fromString($rawMessageIdentifier);
        $inspectionRequest = InspectionRequest::fromMessageIdentifier($messageIdentifier);
        $request->attributes->set($configuration->getName(), $inspectionRequest);
    }

    /**
     * {@inheritdoc}
     */
    public function supports(ParamConverter $configuration)
    {
        return $configuration->getConverter() == 'inspection_request';
    }
}
