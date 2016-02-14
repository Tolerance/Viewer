<?php

namespace spec\Tolerance\Viewer;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Tolerance\MessageProfile\MessageProfile;

class InspectionSpec extends ObjectBehavior
{
    function let(MessageProfile $profile1)
    {
        $this->beConstructedWith([$profile1]);
    }

    function it_exposes_a_list_of_message_profiles(MessageProfile $profile1)
    {
        $this->getMessageProfiles()->shouldReturn([$profile1]);
    }
}
