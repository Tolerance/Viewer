<?php

namespace spec\Tolerance\Viewer;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Tolerance\MessageProfile\Identifier\MessageIdentifier;

class InspectionRequestSpec extends ObjectBehavior
{
    function it_exposes_a_message_identifier(MessageIdentifier $messageIdentifier)
    {
        $this->beConstructedFromMessageIdentifier($messageIdentifier);

        $this->getMessageIdentifier()->shouldReturn($messageIdentifier);
    }
}
