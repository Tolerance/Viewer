<?php

namespace Tolerance\Viewer\Neo4j;

use Tolerance\MessageProfile\Peer\MessagePeer;

final class Peer implements MessagePeer
{
    /**
     * @var string
     */
    private $identifier;

    /**
     * @var bool
     */
    private $virtual;

    /**
     * @var string
     */
    private $service;

    /**
     * @var array
     */
    private $details;

    private function __construct()
    {
    }

    /**
     * @param array $normalized
     *
     * @return Peer
     */
    public static function fromNormalized(array $normalized)
    {
        if (!array_key_exists('identifier', $normalized)) {
            throw new \InvalidArgumentException('Missing peer `identifier`');
        }

        $peer = new self();
        $peer->identifier = $normalized['identifier'];
        $peer->virtual = array_key_exists('virtual', $normalized) && $normalized['virtual'];
        $peer->service = array_key_exists('service', $normalized) ? $normalized['service'] : null;
        $peer->details = $normalized;

        return $peer;
    }

    /**
     * {@inheritdoc}
     */
    public function getIdentifier()
    {
        return $this->identifier;
    }

    /**
     * @return bool
     */
    public function isVirtual()
    {
        return $this->virtual;
    }

    /**
     * @return array
     */
    public function getDetails()
    {
        return $this->details;
    }
}
