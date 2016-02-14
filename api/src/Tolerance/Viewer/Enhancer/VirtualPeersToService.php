<?php

namespace Tolerance\Viewer\Enhancer;

use Tolerance\MessageProfile\MessageProfile;
use Tolerance\MessageProfile\Peer\MessagePeer;
use Tolerance\Viewer\Inspection;
use Tolerance\Viewer\InspectionRequest;
use Tolerance\Viewer\Inspector;
use Tolerance\Viewer\Neo4j\Peer;

class VirtualPeersToService implements Inspector
{
    /**
     * @var Inspector
     */
    private $decoratedInspector;

    /**
     * @param Inspector $decoratedInspector
     */
    public function __construct(Inspector $decoratedInspector)
    {
        $this->decoratedInspector = $decoratedInspector;
    }

    /**
     * {@inheritdoc}
     */
    public function inspect(InspectionRequest $request): Inspection
    {
        $inspection = $this->decoratedInspector->inspect($request);

        $profiles = array_map(function(MessageProfile $profile) {
            return $this->replaceVirtualProfilePeers($profile);
        }, $inspection->getMessageProfiles());

        return new Inspection($profiles);
    }

    /**
     * @param MessageProfile $profile
     *
     * @return MessageProfile
     */
    private function replaceVirtualProfilePeers(MessageProfile $profile)
    {
        if ($this->isVirtualPeer($profile->getSender())) {
            $profile = $profile->withSender($this->createServiceFromVirtual($profile->getSender()));
        }

        if ($this->isVirtualPeer($profile->getRecipient())) {
            $profile = $profile->withRecipient($this->createServiceFromVirtual($profile->getRecipient()));
        }

        return $profile;
    }

    /**
     * @param MessagePeer|null $peer
     *
     * @return bool
     */
    private function isVirtualPeer(MessagePeer $peer = null)
    {
        if (null === $peer) {
            return true;
        }

        if ($peer instanceof Peer) {
            return $peer->isVirtual();
        }

        return false;
    }

    /**
     * @param MessagePeer|null $peer
     *
     * @return MessagePeer
     */
    private function createServiceFromVirtual(MessagePeer $peer = null)
    {
        if ($peer instanceof Peer) {
            $details = $peer->getDetails();

            if (array_key_exists('host', $details)) {
                $peer = Peer::fromNormalized(array_merge($details, [
                    'service' => $details['host'],
                ]));
            }
        }

        return $peer ?: Peer::fromNormalized([
            'identifier' => 'unknown',
            'service' => 'Unknown',
        ]);
    }
}
