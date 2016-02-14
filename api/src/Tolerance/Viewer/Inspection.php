<?php

namespace Tolerance\Viewer;

use Tolerance\MessageProfile\MessageProfile;

final class Inspection
{
    /**
     * @var MessageProfile[]
     */
    private $profiles;

    /**
     * @param MessageProfile[] $profiles
     */
    public function __construct(array $profiles)
    {
        $this->profiles = $profiles;
    }

    /**
     * @return MessageProfile[]
     */
    public function getMessageProfiles()
    {
        return $this->profiles;
    }
}
