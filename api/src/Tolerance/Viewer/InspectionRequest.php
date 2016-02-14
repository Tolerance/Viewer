<?php

namespace Tolerance\Viewer;

use Tolerance\MessageProfile\Identifier\MessageIdentifier;

class InspectionRequest
{
    /**
     * @var MessageIdentifier
     */
    private $messageIdentifier;

    /**
     * @param MessageIdentifier $messageIdentifier
     *
     * @return InspectionRequest
     */
    public static function fromMessageIdentifier(MessageIdentifier $messageIdentifier)
    {
        $request = new self();
        $request->messageIdentifier = $messageIdentifier;

        return $request;
    }

    /**
     * @return MessageIdentifier
     */
    public function getMessageIdentifier()
    {
        return $this->messageIdentifier;
    }
}
