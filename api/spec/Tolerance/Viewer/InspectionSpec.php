<?php

namespace spec\Tolerance\Viewer;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class InspectionSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Tolerance\Viewer\Inspection');
    }
}
